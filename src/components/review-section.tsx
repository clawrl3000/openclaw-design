"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface ReviewData {
  id: string;
  rating: number;
  body: string | null;
  createdAt: string;
  userName: string | null;
  userImage: string | null;
  userId: string;
}

interface ReviewSectionProps {
  skillSlug: string;
  skillName: string;
}

function PartialStars({ rating, size = "text-[13px]" }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(1, Math.max(0, rating - (star - 1)));
        return (
          <span
            key={star}
            className={`${size} relative inline-block`}
            style={{ width: "1em", height: "1em" }}
          >
            <span className="absolute inset-0 text-white/10">★</span>
            {fill > 0 && (
              <span
                className="absolute inset-0 text-[#F59E0B]"
                style={{ clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }}
              >
                ★
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function ClickableStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl transition-colors ${
            star <= (hover || value) ? "text-[#F59E0B]" : "text-white/15"
          } hover:scale-110 transition-transform`}
          onMouseEnter={() => setHover(star)}
          onClick={() => onChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function ReviewSection({ skillSlug, skillName }: ReviewSectionProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formRating, setFormRating] = useState(0);
  const [formBody, setFormBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [userReview, setUserReview] = useState<ReviewData | null>(null);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [editing, setEditing] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?skillSlug=${skillSlug}`);
      if (!res.ok) return;
      const data = await res.json();
      setReviews(data.reviews);
      setAvgRating(data.avgRating);
      setReviewCount(data.reviewCount);

      // Check if current user has a review
      if (session?.user?.id) {
        const existing = data.reviews.find(
          (r: ReviewData) => r.userId === session.user.id
        );
        if (existing) {
          setUserReview(existing);
          setFormRating(existing.rating);
          setFormBody(existing.body || "");
        }
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [skillSlug, session?.user?.id]);

  // Check if user purchased this skill
  useEffect(() => {
    if (!session?.user?.id) return;
    fetch(`/api/reviews/check-purchase?skillSlug=${skillSlug}`)
      .then((r) => r.json())
      .then((data) => setHasPurchased(data.purchased))
      .catch(() => {});
  }, [skillSlug, session?.user?.id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRating === 0) {
      setFormError("Please select a rating");
      return;
    }
    setSubmitting(true);
    setFormError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillSlug,
          rating: formRating,
          body: formBody || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || "Failed to submit review");
        return;
      }

      setEditing(false);
      await fetchReviews();
    } catch {
      setFormError("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Delete your review?")) return;
    try {
      await fetch(`/api/reviews?id=${reviewId}`, { method: "DELETE" });
      setUserReview(null);
      setFormRating(0);
      setFormBody("");
      await fetchReviews();
    } catch {
      // silent
    }
  };

  if (loading) {
    return (
      <div className="mt-12 space-y-4">
        <div className="h-6 w-32 bg-white/5 rounded animate-pulse" />
        <div className="h-20 w-full bg-white/5 rounded animate-pulse" />
      </div>
    );
  }

  const showForm = session?.user?.id && hasPurchased && (!userReview || editing);

  return (
    <div className="mt-12 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-mono font-bold text-lg text-white">Reviews</h2>
          {avgRating !== null && (
            <div className="flex items-center gap-2">
              <PartialStars rating={avgRating} />
              <span className="text-[13px] text-white/50 font-mono">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-[11px] text-white/25 font-mono">
                ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
          {reviewCount === 0 && (
            <span className="text-[13px] text-white/25 font-mono">
              No reviews yet
            </span>
          )}
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#261D15] border border-white/[0.06] rounded-xl p-5 space-y-4"
        >
          <p className="font-mono text-sm text-white/60">
            {userReview ? "Edit your review" : `Review ${skillName}`}
          </p>
          <ClickableStars value={formRating} onChange={setFormRating} />
          <textarea
            value={formBody}
            onChange={(e) => setFormBody(e.target.value)}
            placeholder="Write your review (optional)…"
            rows={3}
            className="w-full bg-[#1E1510] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white/80 font-mono placeholder:text-white/20 focus:outline-none focus:border-[#FF4D4D]/30 resize-none"
          />
          {formError && (
            <p className="text-[#FF4D4D] text-xs font-mono">{formError}</p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="text-xs font-mono font-medium text-white/90 bg-[#FF4D4D]/20 hover:bg-[#FF4D4D]/30 border border-[#FF4D4D]/25 hover:border-[#FF4D4D]/40 rounded-lg px-4 py-2 transition-all disabled:opacity-50"
            >
              {submitting ? "Submitting…" : userReview ? "Update Review" : "Submit Review"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-xs font-mono text-white/40 hover:text-white/60 px-3 py-2 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* User's existing review with edit/delete */}
      {userReview && !editing && (
        <div className="bg-[#261D15] border border-[#F59E0B]/15 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#F59E0B]/60">Your review</span>
              <PartialStars rating={userReview.rating} size="text-xs" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(true)}
                className="text-[10px] font-mono text-white/30 hover:text-white/60 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(userReview.id)}
                className="text-[10px] font-mono text-[#FF4D4D]/40 hover:text-[#FF4D4D]/70 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          {userReview.body && (
            <p className="text-sm text-white/60 font-mono">{userReview.body}</p>
          )}
        </div>
      )}

      {/* Prompt to sign in or purchase */}
      {!session?.user?.id && reviewCount === 0 && (
        <p className="text-xs text-white/20 font-mono">
          Sign in and purchase this skill to leave a review.
        </p>
      )}
      {session?.user?.id && !hasPurchased && !userReview && (
        <p className="text-xs text-white/20 font-mono">
          Purchase this skill to leave a review.
        </p>
      )}

      {/* Review List */}
      {reviews
        .filter((r) => r.userId !== session?.user?.id)
        .map((review) => (
          <div
            key={review.id}
            className="flex gap-3 py-4 border-t border-white/[0.04]"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              {review.userImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={review.userImage}
                  alt={review.userName || "User"}
                  className="w-8 h-8 rounded-full border border-white/[0.06]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs text-white/30 font-mono">
                  {(review.userName || "?")[0]}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-white/70">
                  {review.userName || "Anonymous"}
                </span>
                <PartialStars rating={review.rating} size="text-[11px]" />
                <span className="text-[10px] text-white/20 font-mono">
                  {relativeTime(review.createdAt)}
                </span>
              </div>
              {review.body && (
                <p className="text-sm text-white/50 leading-relaxed">
                  {review.body}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
