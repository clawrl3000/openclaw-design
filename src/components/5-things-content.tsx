"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

/* ── Scroll Reveal Hook ─────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    el.querySelectorAll(".reveal").forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Step Card Component ──────────────────────────────── */
function StepCard({
  number,
  title,
  gradient,
  children,
}: {
  number: number;
  title: string;
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <section className="reveal mb-16">
      <div className="flex items-start gap-5 mb-6">
        <div
          className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
          style={{ background: gradient }}
        >
          {number}
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {title}
          </h2>
        </div>
      </div>
      <div className="pl-0 md:pl-[4.75rem]">{children}</div>
    </section>
  );
}

/* ── Prompt Block ─────────────────────────────────────── */
function PromptBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-white/[0.08] bg-[#110B07]/80 overflow-hidden">
      <div className="px-4 py-2 border-b border-white/[0.06] bg-white/[0.03]">
        <span className="text-xs font-mono text-[#00E5CC]">{title}</span>
      </div>
      <div className="p-4 text-sm text-white/80 font-mono leading-relaxed whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}

/* ── Checklist ────────────────────────────────────────── */
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-white/70 leading-relaxed">
      <span className="text-[#00E5CC] mt-1 shrink-0">✓</span>
      <span>{children}</span>
    </li>
  );
}

/* ── Main Content ─────────────────────────────────────── */
export function FiveThingsContent() {
  const wrapperRef = useReveal();

  return (
    <div ref={wrapperRef}>
      <SiteNavbar />

      {/* ── Hero ────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f08] via-[#0D0705] to-[#0D0705]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF4D4D]/8 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-20">
          <div className="reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono px-3 py-1 rounded-full border border-[#00E5CC]/30 text-[#00E5CC]">
                Getting Started
              </span>
              <span className="text-xs text-white/40">Feb 21, 2026</span>
              <span className="text-white/20">·</span>
              <span className="text-xs text-white/40">10 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
              5 Things to Do{" "}
              <span className="bg-gradient-to-r from-[#FF4D4D] to-[#F59E0B] bg-clip-text text-transparent">
                Right After
              </span>{" "}
              Setting Up OpenClaw
            </h1>

            <p className="text-lg text-white/60 max-w-2xl leading-relaxed mb-8">
              Your OpenClaw is installed. It&apos;s running. But without these five steps,
              it&apos;s basically a glorified ChatGPT. Here&apos;s how to turn it into an autonomous
              AI employee that works for you 24/7.
            </p>

            <div className="flex flex-wrap gap-2">
              {["Setup", "Productivity", "Autonomy", "Mission Control", "Brain Dump"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-white/[0.06] text-white/50 rounded font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Intro */}
        <div className="reveal mb-16">
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Most people install OpenClaw, send a few messages, and wonder why it isn&apos;t
            doing anything impressive. The difference between a passive chatbot and an
            agent that surprises you with completed work every morning comes down to
            these five things.
          </p>
          <div className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-5">
            <p className="text-[#F59E0B] text-sm font-medium mb-2">💡 Already set up?</p>
            <p className="text-white/60 text-sm">
              Even if you&apos;ve been running OpenClaw for weeks, doing these five things now
              will immediately make it more productive. It&apos;s never too late.
            </p>
          </div>
        </div>

        {/* ── Step 1: Brain Dump ──────────────────────── */}
        <StepCard
          number={1}
          title="Brain Dump Your Context"
          gradient="linear-gradient(135deg, #8B5CF6, #00E5CC)"
        >
          <p className="text-white/70 leading-relaxed mb-6">
            Your OpenClaw is powerful, but it knows nothing about you. Without context,
            it can&apos;t make decisions on your behalf, can&apos;t prioritize what matters to you,
            and definitely can&apos;t work autonomously toward your goals.
          </p>

          <p className="text-white/70 leading-relaxed mb-6">
            The brain dump goes into your <code className="text-[#00E5CC] bg-white/[0.06] px-1.5 py-0.5 rounded text-sm">USER.md</code> file.
            This is the file your agent reads every session to understand who you are.
          </p>

          <h3 className="text-lg font-semibold text-white mb-4">What to Include</h3>
          <ul className="space-y-3 mb-6">
            <CheckItem>
              <strong className="text-white">Your interests</strong> — What topics, industries, and niches
              do you care about? This drives what news and updates your agent surfaces.
            </CheckItem>
            <CheckItem>
              <strong className="text-white">Your career</strong> — What do you do? Are you a developer,
              creator, founder, freelancer? Your agent tailors its output to your domain.
            </CheckItem>
            <CheckItem>
              <strong className="text-white">Your goals</strong> — What are you trying to achieve this quarter?
              This year? Growing a YouTube channel? Launching a SaaS? Getting promoted?
            </CheckItem>
            <CheckItem>
              <strong className="text-white">Your ambitions</strong> — The bigger picture. Where do you want
              to be in 2-3 years? This shapes how your agent prioritizes long-term tasks.
            </CheckItem>
            <CheckItem>
              <strong className="text-white">Your preferences</strong> — Communication style, timezone,
              tools you use, things you hate. The more your agent knows, the less friction.
            </CheckItem>
          </ul>

          <PromptBlock title="Example prompt to get started">
{`I want to brain dump my context to you so you can be more helpful.

Here's what I need you to know about me:
- I'm a [role] working on [project/company]
- My main goals right now are [goal 1], [goal 2], [goal 3]
- I'm interested in [topics]
- I use [tools] for my daily work
- My timezone is [timezone]

Please update USER.md with this information and ask me
any follow-up questions that would help you work better for me.`}
          </PromptBlock>

          <div className="rounded-xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 p-5">
            <p className="text-[#8B5CF6] text-sm font-medium mb-2">🔄 Reverse Prompting</p>
            <p className="text-white/60 text-sm">
              Can&apos;t articulate your goals? Ask your OpenClaw: &quot;I&apos;m trying to figure out
              what my goals and ambitions are. Can you ask me questions to help pull it out of me?&quot;
              Your agent will interview you and distill the answers into your context files.
            </p>
          </div>
        </StepCard>

        {/* ── Step 2: Connect Tools ──────────────────── */}
        <StepCard
          number={2}
          title="Connect Your Tools"
          gradient="linear-gradient(135deg, #00E5CC, #10B981)"
        >
          <p className="text-white/70 leading-relaxed mb-6">
            OpenClaw can pull data from dozens of sources — calendars, task managers,
            email, APIs, databases, monitoring tools. But it won&apos;t connect to anything
            unless you tell it what you use.
          </p>

          <p className="text-white/70 leading-relaxed mb-6">
            The magic happens when your agent can see your task list, your calendar,
            your inbox, and your project status all at once. It starts taking tasks off
            your plate automatically.
          </p>

          <h3 className="text-lg font-semibold text-white mb-4">High-Value Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { category: "Productivity", tools: "Things 3, Todoist, Notion, Linear", color: "#00E5CC" },
              { category: "Communication", tools: "Telegram, Discord, Slack, Email", color: "#8B5CF6" },
              { category: "Development", tools: "GitHub, GitLab, Docker, CI/CD", color: "#F59E0B" },
              { category: "Monitoring", tools: "Plausible, Grafana, UptimeRobot", color: "#FF4D4D" },
            ].map((item) => (
              <div
                key={item.category}
                className="bg-[#110B07]/60 rounded-xl border border-white/[0.08] p-4"
              >
                <h4 className="text-sm font-semibold mb-1" style={{ color: item.color }}>
                  {item.category}
                </h4>
                <p className="text-white/50 text-sm">{item.tools}</p>
              </div>
            ))}
          </div>

          <PromptBlock title="Example prompt">
{`I use these tools daily:
- Things 3 for task management
- Google Calendar for scheduling
- GitHub for code
- Plausible for website analytics

Can you figure out how to connect to each of these
and start including them in your workflows?`}
          </PromptBlock>

          <p className="text-white/50 text-sm">
            Your agent will research APIs, install skills, and wire up connections.
            You don&apos;t need to be technical — just tell it what you use.
          </p>
        </StepCard>

        {/* ── Step 3: Mission Control ────────────────── */}
        <StepCard
          number={3}
          title="Build Your Mission Control"
          gradient="linear-gradient(135deg, #F59E0B, #FF4D4D)"
        >
          <p className="text-white/70 leading-relaxed mb-6">
            Mission Control is a locally-hosted dashboard where you and your agent
            build custom tools together. Think of it as your agent&apos;s workspace — a place
            to track tasks, view documents, monitor autonomous work, and add whatever
            custom tooling you need.
          </p>

          <h3 className="text-lg font-semibold text-white mb-4">Starter Tools to Build</h3>
          <div className="space-y-3 mb-6">
            {[
              {
                name: "Task Tracker",
                desc: "See every task your OpenClaw is doing autonomously — what's queued, in progress, and completed.",
                icon: "📋",
              },
              {
                name: "Calendar View",
                desc: "Visual calendar of all scheduled autonomous tasks — see when your agent is planning to work.",
                icon: "📅",
              },
              {
                name: "Documents Hub",
                desc: "Browse all plans, reports, and documents your agent creates — review them at your own pace.",
                icon: "📄",
              },
              {
                name: "Custom Tools",
                desc: "Content planner, analytics dashboard, lead tracker — whatever your workflow needs, just ask.",
                icon: "🔧",
              },
            ].map((tool) => (
              <div
                key={tool.name}
                className="flex items-start gap-4 bg-[#110B07]/60 rounded-xl border border-white/[0.08] p-4"
              >
                <span className="text-2xl mt-0.5">{tool.icon}</span>
                <div>
                  <h4 className="text-sm font-semibold text-white">{tool.name}</h4>
                  <p className="text-white/50 text-sm">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <PromptBlock title="The prompt to get started">
{`I want a Mission Control — a local dashboard where we can
build custom tools together.

Please build this in Next.js and host it locally.
Start with a task tracker, calendar view, and documents hub.
I'll add more tools as we go.`}
          </PromptBlock>

          <div className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-5">
            <p className="text-[#F59E0B] text-sm font-medium mb-2">⚡ No coding required</p>
            <p className="text-white/60 text-sm">
              You don&apos;t need to write a single line of code. Your OpenClaw handles the
              entire build — frontend, backend, data storage. You just describe what
              you want and iterate.
            </p>
          </div>
        </StepCard>

        {/* ── Step 4: Mission Statement ──────────────── */}
        <StepCard
          number={4}
          title="Create Your Mission Statement"
          gradient="linear-gradient(135deg, #FF4D4D, #8B5CF6)"
        >
          <p className="text-white/70 leading-relaxed mb-6">
            This might be the most important step. A mission statement is a single
            sentence that your OpenClaw remembers with <em>every single prompt</em>.
            It&apos;s the lens through which every task, every decision, every autonomous
            action is filtered.
          </p>

          <p className="text-white/70 leading-relaxed mb-6">
            Without a mission statement, your agent is a generalist doing random tasks.
            With one, it&apos;s a focused operator pulling everything toward a single goal.
          </p>

          <h3 className="text-lg font-semibold text-white mb-4">Example Mission Statements</h3>
          <div className="space-y-3 mb-6">
            {[
              "Build an autonomous organization of AI agents that produces value 24/7.",
              "Grow my SaaS to $10K MRR through content marketing and product-led growth.",
              "Become the most knowledgeable person in my field by systematically learning and publishing insights.",
              "Automate every repeatable task in my workflow so I can focus on creative work.",
            ].map((statement, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-[#110B07]/60 rounded-xl border border-white/[0.08] p-4"
              >
                <span className="text-[#FF4D4D]/60 mt-1 shrink-0">→</span>
                <p className="text-white/70 text-sm italic">&quot;{statement}&quot;</p>
              </div>
            ))}
          </div>

          <PromptBlock title="If you know your mission">
{`Our mission statement is: "[your mission here]"

Please put this at the top of our workspace so you remember
it with everything we do. Every task should bring us closer
to this mission.`}
          </PromptBlock>

          <PromptBlock title="If you need help finding it">
{`Based on everything you know about me — my goals, my tools,
my workflows — what should our mission statement be?

What's the one statement you should remember with every task
that will help us be more productive and get closer to my goals?`}
          </PromptBlock>

          <p className="text-white/50 text-sm">
            Think of your mission statement as a laser focus for an incredibly
            powerful tool. Without it, the energy scatters. With it, everything
            converges on one point.
          </p>
        </StepCard>

        {/* ── Step 5: Set Expectations ────────────────── */}
        <StepCard
          number={5}
          title="Set Proactive Expectations"
          gradient="linear-gradient(135deg, #10B981, #00E5CC)"
        >
          <p className="text-white/70 leading-relaxed mb-6">
            The number one complaint from new OpenClaw users: &quot;My agent isn&apos;t proactive
            at all.&quot; That&apos;s because nobody told it to be. By default, OpenClaw waits
            for your input. You have to explicitly set the expectation that it should
            initiate work on its own.
          </p>

          <p className="text-white/70 leading-relaxed mb-6">
            Think of it like onboarding a new employee. You don&apos;t just hand them a
            laptop and hope they figure out what to do. You sit them down and say:
            &quot;Here&apos;s what I expect from you.&quot;
          </p>

          <PromptBlock title="The proactive employee prompt">
{`You are my autonomous, proactive employee. I want you to do
work with me that brings us closer to our mission statement.

I want to wake up every morning and be pleasantly surprised
by the work you completed.

Please schedule time every night and afternoon to do a task
that brings us closer to our mission statement.`}
          </PromptBlock>

          <h3 className="text-lg font-semibold text-white mb-4">What Happens After</h3>
          <p className="text-white/70 leading-relaxed mb-6">
            Once you set this expectation, your OpenClaw will start using its heartbeat
            and cron systems to schedule autonomous work. You&apos;ll wake up to messages like:
          </p>
          <div className="space-y-2 mb-6">
            {[
              "\"Researched 5 competitors in your niche and wrote a comparison doc.\"",
              "\"Published the blog draft you outlined yesterday.\"",
              "\"Found 3 new backlink opportunities and drafted outreach emails.\"",
              "\"Updated your task board — 2 items moved to done, 1 new priority flagged.\"",
            ].map((msg, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-[#10B981]/5 border border-[#10B981]/20 rounded-lg p-3"
              >
                <span className="text-[#10B981] shrink-0">💬</span>
                <p className="text-white/60 text-sm">{msg}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#10B981]/20 bg-[#10B981]/5 p-5">
            <p className="text-[#10B981] text-sm font-medium mb-2">🔑 The Key Insight</p>
            <p className="text-white/60 text-sm">
              OpenClaw already has the infrastructure for proactive work — heartbeats,
              cron jobs, background agents. But it needs your permission and direction
              to use them. Setting expectations unlocks everything.
            </p>
          </div>
        </StepCard>

        {/* ── Summary ─────────────────────────────────── */}
        <section className="reveal mb-16">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#1E1510] to-[#110B07] p-8">
            <h2 className="text-2xl font-bold text-white mb-6">The Quick Checklist</h2>
            <div className="space-y-4">
              {[
                { step: "1", label: "Brain Dump", desc: "Fill out USER.md with interests, career, goals, ambitions, preferences" },
                { step: "2", label: "Connect Tools", desc: "Tell your agent every tool you use — it'll wire up the integrations" },
                { step: "3", label: "Mission Control", desc: "Build a local dashboard with task tracker, calendar, and docs hub" },
                { step: "4", label: "Mission Statement", desc: "One sentence that focuses every task toward your ultimate goal" },
                { step: "5", label: "Set Expectations", desc: "Tell your agent to be proactive — schedule autonomous work daily" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4D4D] to-[#F59E0B] flex items-center justify-center text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{item.label}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────── */}
        <section className="reveal text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to make your OpenClaw actually work for you?
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            These five steps take about 30 minutes total. The productivity gains last forever.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/learn"
              className="px-6 py-3 rounded-xl border border-white/[0.12] text-white/80 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
            >
              ← Back to Learn
            </Link>
            <Link
              href="/browse"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF4D4D] to-[#F59E0B] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Browse Skills →
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
