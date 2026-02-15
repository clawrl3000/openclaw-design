"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * ASCII Animation component — adapted from semicolons-dev/asciify
 * Loads pre-rendered ASCII frame .txt files and plays them back
 * with requestAnimationFrame for smooth, performant animation.
 */

class AnimationManager {
  private _animation: number | null = null;
  private callback: () => void;
  private lastFrame = -1;
  private frameTime = 1000 / 30;

  constructor(callback: () => void, fps = 30) {
    this.callback = callback;
    this.frameTime = 1000 / fps;
  }

  updateFPS(fps: number) {
    this.frameTime = 1000 / fps;
  }

  start() {
    if (this._animation != null) return;
    this._animation = requestAnimationFrame(this.update);
  }

  pause() {
    if (this._animation == null) return;
    this.lastFrame = -1;
    cancelAnimationFrame(this._animation);
    this._animation = null;
  }

  private update = (time: number) => {
    const { lastFrame } = this;
    let delta = time - lastFrame;
    if (this.lastFrame === -1) {
      this.lastFrame = time;
    } else {
      while (delta >= this.frameTime) {
        this.callback();
        delta -= this.frameTime;
        this.lastFrame += this.frameTime;
      }
    }
    this._animation = requestAnimationFrame(this.update);
  };
}

type Quality = "low" | "medium" | "high";

const FALLBACK_ORDER: Record<Quality, Quality[]> = {
  low: ["low", "high", "medium"],
  medium: ["medium", "high", "low"],
  high: ["high", "low", "medium"],
};

async function resolveFrameSource(
  frameFolder: string,
  quality: Quality,
  firstFrameFile: string
): Promise<{ baseUrl: string; isFlat: boolean } | null> {
  const fallbackQualities = FALLBACK_ORDER[quality];

  for (const candidate of fallbackQualities) {
    try {
      const probeUrl = `/${frameFolder}/${candidate}/${firstFrameFile}`;
      const probeResponse = await fetch(probeUrl);
      if (probeResponse.ok) {
        return { baseUrl: `/${frameFolder}/${candidate}`, isFlat: false };
      }
    } catch {
      // continue
    }
  }

  try {
    const legacyProbe = await fetch(`/${frameFolder}/${firstFrameFile}`);
    if (legacyProbe.ok) {
      return { baseUrl: `/${frameFolder}`, isFlat: true };
    }
  } catch {
    // no legacy frames
  }

  return null;
}

interface ASCIIAnimationProps {
  frames?: string[];
  className?: string;
  fps?: number;
  frameCount?: number;
  frameFolder?: string;
  textSize?: string;
  showFrameCounter?: boolean;
  quality?: Quality;
  ariaLabel?: string;
  lazy?: boolean;
  color?: string;
  gradient?: string;
}

export default function ASCIIAnimation({
  frames: providedFrames,
  className = "",
  fps = 24,
  frameCount = 60,
  frameFolder = "frames",
  textSize = "text-xs",
  showFrameCounter = false,
  ariaLabel,
  quality = "medium",
  lazy = true,
  color,
  gradient,
}: ASCIIAnimationProps) {
  const [frames, setFrames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const frameCounterRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaled, setScaled] = useState(false);

  const currentFrameRef = useRef(0);
  const framesRef = useRef<string[]>([]);

  useEffect(() => {
    framesRef.current = frames;
  }, [frames]);

  const fullLoadTriggered = useRef(false);
  const resolvedSource = useRef<{ baseUrl: string; isFlat: boolean } | null>(
    null
  );

  const animationManager = useMemo(
    () =>
      new AnimationManager(() => {
        const f = framesRef.current;
        if (f.length === 0) return;
        const nextFrame = (currentFrameRef.current + 1) % f.length;
        currentFrameRef.current = nextFrame;

        if (preRef.current) {
          preRef.current.textContent = f[nextFrame];
        }
        if (frameCounterRef.current) {
          frameCounterRef.current.textContent = `Frame: ${nextFrame + 1}/${f.length}`;
        }
      }, fps),
    [fps]
  );

  const frameFiles = useMemo(
    () =>
      Array.from(
        { length: frameCount },
        (_, i) => `frame_${String(i + 1).padStart(5, "0")}.txt`
      ),
    [frameCount]
  );

  const loadAllFrames = useCallback(async () => {
    if (fullLoadTriggered.current) return;
    fullLoadTriggered.current = true;

    const source = resolvedSource.current;
    if (!source) return;

    try {
      const framePromises = frameFiles.map(async (filename) => {
        const response = await fetch(`${source.baseUrl}/${filename}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filename}: ${response.status}`);
        }
        return await response.text();
      });

      const loadedFrames = await Promise.all(framePromises);
      setFrames(loadedFrames);
      currentFrameRef.current = 0;
    } catch (error) {
      console.error("Failed to load ASCII frames:", error);
    } finally {
      setIsLoading(false);
    }
  }, [frameFiles]);

  useEffect(() => {
    fullLoadTriggered.current = false;
    resolvedSource.current = null;

    const loadPreview = async () => {
      if (providedFrames) {
        setFrames(providedFrames);
        setIsLoading(false);
        fullLoadTriggered.current = true;
        return;
      }

      const source = await resolveFrameSource(
        frameFolder,
        quality,
        frameFiles[0]
      );
      if (!source) {
        console.error(
          `ASCIIAnimation: could not find frames for "${frameFolder}"`
        );
        setIsLoading(false);
        return;
      }

      resolvedSource.current = source;

      try {
        const response = await fetch(`${source.baseUrl}/${frameFiles[0]}`);
        if (!response.ok) throw new Error(`Failed to fetch preview frame`);
        const firstFrame = await response.text();
        setFrames([firstFrame]);
        currentFrameRef.current = 0;
      } catch (error) {
        console.error("Failed to load preview frame:", error);
      }

      if (!lazy) {
        await loadAllFrames();
      } else {
        setIsLoading(false);
      }
    };

    loadPreview();
  }, [providedFrames, frameCount, frameFolder, quality, lazy, frameFiles, loadAllFrames]);

  useEffect(() => {
    if (frames.length === 0 || !containerRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (lazy && !fullLoadTriggered.current) {
              loadAllFrames();
            }
            if (!reducedMotion) {
              animationManager.start();
            }
          } else {
            animationManager.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      animationManager.pause();
    };
  }, [animationManager, frames.length, lazy, loadAllFrames]);

  useLayoutEffect(() => {
    if (!containerRef.current || !preRef.current || frames.length === 0) return;

    const updateScale = () => {
      const container = containerRef.current;
      const content = preRef.current;
      if (!container || !content) return;

      const availableWidth = container.clientWidth;
      const availableHeight = container.clientHeight;
      const naturalWidth = content.scrollWidth;
      const naturalHeight = content.scrollHeight;

      if (naturalWidth === 0 || naturalHeight === 0) return;

      const newScale = Math.min(
        availableWidth / naturalWidth,
        availableHeight / naturalHeight
      );

      setScale(newScale * 0.95);

      if (!scaled) setScaled(true);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [frames, quality, scaled]);

  if (isLoading && frames.length === 0) {
    return <div className={`${className}`} />;
  }

  if (!frames.length) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full flex items-center justify-center ${className}`}
      {...(ariaLabel ? { role: "img", "aria-label": ariaLabel } : {})}
    >
      {showFrameCounter && (
        <div
          ref={frameCounterRef}
          className="absolute top-2 left-2 z-10 text-white bg-black/50 px-2 py-1 rounded text-xs"
        >
          Frame: {currentFrameRef.current + 1}/{frames.length}
        </div>
      )}
      <pre
        ref={preRef}
        className={`leading-none origin-center ${textSize}`}
        style={{
          transform: `scale(${scale})`,
          opacity: scaled ? 1 : 0,
          transition: "opacity 0.5s ease-in",
          ...(gradient
            ? {
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : color
              ? { color }
              : {}),
        }}
      >
        {frames[currentFrameRef.current]}
      </pre>
    </div>
  );
}
