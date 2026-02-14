# PRD: Clawdbot Dashboard

## Introduction

A dashboard and control interface for **Clawdbot**—a self-evolving, local-first agent running on a Mac Mini. Inspired by systems like Spark: persistent memory, multi-modal learning, calibration through conversation and shared content, and continuous learning about tools, agents, and orchestration.

The dashboard’s primary job is to **visualize the bot working**: what it’s doing right now, what’s in the task queue, and how it moves through work. Over time it can surface memories, insights, and tool/agent usage, but the MVP centers on **tasks and queue**.

---

## Goals

- Give a clear, real-time view of Clawdbot’s **current work** and **task queue**.
- Visualize **flow**: queued → in progress → completed (and failed, if applicable).
- Support **local-first** deployment (e.g. same network as Mac Mini, or localhost).
- Create a foundation to later show memories, insights, tools, and agent orchestration.
- Keep the UI focused and “vibes-friendly”—calibration and evolution should feel visible, not buried in logs.

---

## User Stories

### US-001: Project scaffold and dev server
**Description:** As a developer, I need a new dashboard app (React + Vite) so we can build the UI incrementally.

**Acceptance Criteria:**
- [ ] New `dashboard/` app with Vite + React + TypeScript (aligned with `flowchart/` where useful).
- [ ] `npm run dev` runs dev server; `npm run build` produces a production build.
- [ ] Typecheck and lint pass.
- [ ] Verify in browser using dev-browser skill.

### US-002: Task queue list
**Description:** As a user, I want to see the current task queue (ordered list of pending tasks) so I know what Clawdbot will work on next.

**Acceptance Criteria:**
- [ ] Dedicated “Queue” view listing pending tasks in order (top = next).
- [ ] Each row shows at least: task id, short title/summary, optionally source or priority if we have it.
- [ ] Empty state when queue is empty.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-003: Current task / “Working on” panel
**Description:** As a user, I want to see what Clawdbot is **currently** working on so I can follow its progress.

**Acceptance Criteria:**
- [ ] “Working on” (or equivalent) panel showing the active task.
- [ ] Displays task id, title/summary, and status (e.g. “in progress”).
- [ ] Empty/neutral state when no task is active.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-004: Recent / completed tasks
**Description:** As a user, I want to see recently completed (and optionally failed) tasks so I can review what just happened.

**Acceptance Criteria:**
- [ ] “Recent” or “Completed” list (e.g. last N tasks, configurable or fixed).
- [ ] Each item shows id, title, status (completed / failed), and optionally timestamp.
- [ ] Clear visual distinction between completed vs failed.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-005: Connect dashboard to Clawdbot data source (API or mock)
**Description:** As a developer, I need the dashboard to read task and queue data from a real source so the UI reflects Clawdbot’s actual state.

**Acceptance Criteria:**
- [ ] Data layer (API client or similar) that fetches: queue, current task, recent completed/failed.
- [ ] Environment-driven base URL (or config) for Mac Mini / local endpoint.
- [ ] Fallback to **mock data** when backend unavailable, so UI is always usable during development.
- [ ] Typecheck/lint passes.

### US-006: Live updates for queue and current task
**Description:** As a user, I want the queue and “working on” view to update as Clawdbot progresses so I don’t have to refresh.

**Acceptance Criteria:**
- [ ] Queue and current-task views update automatically (polling or WebSocket, depending on backend).
- [ ] Updates are visible within a few seconds of changes (exact interval TBD by backend).
- [ ] No full-page reload required.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-007: Layout and navigation shell
**Description:** As a user, I want a simple layout with clear sections (Queue, Working on, Recent) and optional nav so the dashboard feels like a single, coherent interface.

**Acceptance Criteria:**
- [ ] Shell layout: header (title, optional nav), main content with distinct areas for Queue, Working on, Recent.
- [ ] Responsive enough to use on a desktop browser (full dashboard use case).
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-008: Basic “evolution” metrics placeholder
**Description:** As a user, I want a small area that hints at “evolution” (e.g. memory count, insight count) so we can later plug in real Spark-like metrics.

**Acceptance Criteria:**
- [ ] “Evolution” or “Stats” section (sidebar or footer) with placeholder metrics (e.g. “Memories: —”, “Insights: —”).
- [ ] Structured so we can replace placeholders with real counts when Clawdbot exposes them.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

---

## Functional Requirements

- **FR-1:** Dashboard runs as a web app (Vite + React), buildable and servable locally or on same network as Mac Mini.
- **FR-2:** Queue view shows an ordered list of pending tasks; order reflects execution order.
- **FR-3:** “Working on” view shows the single currently active task, or empty state.
- **FR-4:** Recent/completed view shows last N finished tasks with status (completed / failed) and optional timestamp.
- **FR-5:** Data is fetched from a configurable backend (Clawdbot API or compatible mock).
- **FR-6:** Queue and current task update automatically (polling or WebSocket).
- **FR-7:** Mock mode allows development and demo without a live Clawdbot instance.
- **FR-8:** Layout includes Queue, Working on, Recent, and a small Evolution/Stats placeholder.

---

## Non-Goals (Out of Scope for MVP)

- **Building or modifying Clawdbot itself.** The dashboard consumes existing APIs or streams; it does not implement the agent.
- **Full Spark feature parity.** No requirement for full memory browser, insight explorer, or tool/agent config UI in v1.
- **User auth or multi-tenancy.** Single-user, local/trusted network is enough for now.
- **Editing queue or tasks from the dashboard.** View-only for MVP; prioritization/cancellation can come later.
- **Mobile-native app.** Browser-based responsive UI is sufficient.

---

## Design Considerations

- **Spark-like vibe:** The dashboard should feel like “watching intelligence at work”—clear flow from queue → active → done, minimal clutter.
- **Legibility:** Dense data (e.g. 30k memories, 500+ insights) will come later; MVP avoids overwhelming users. Use progressive disclosure.
- **Dark theme:** Consider defaulting to a dark UI to match “always-on” local agent vibes; optional light theme later.
- **Reuse:** Prefer patterns from `flowchart/` (e.g. React, Vite) where they fit, but dashboard can have its own component library.

---

## Technical Considerations

- **Stack:** React, TypeScript, Vite. Optionally same UI approach as `flowchart/` for consistency.
- **Data:** REST or WebSocket from Clawdbot (or mock server). Exact API shape TBD; dashboard should tolerate additive changes.
- **Deployment:** Static build deployable to any host; dev server for local work. Mac Mini could serve the dashboard or it could run on another machine on the same network.
- **State:** Client-side state for queue, current task, recent tasks; updates via fetch or WebSocket.

---

## Success Metrics

- User can open the dashboard and, at a glance, see what’s in the queue, what’s running, and what recently finished.
- Queue and “working on” stay in sync with Clawdbot without manual refresh.
- Dashboard is usable offline or against mock data for development and demos.

---

## Open Questions

1. **Clawdbot API:** Does Clawdbot already expose HTTP/WebSocket endpoints for queue, current task, and history? If not, what’s the intended contract?
2. **Identity:** Are tasks and queue globally unique per Mac Mini instance, or do we need user/bot identifiers?
3. **Evolution metrics:** When do we expect real memory/insight counts? Should the placeholder always be visible or hidden until we have data?
4. **Orchestration view:** Should we add a “agents/teams” view in a later PRD, or keep that out of scope indefinitely?

---

## Summary

This PRD defines an **MVP dashboard** that visualizes Clawdbot’s **task queue**, **current work**, and **recent activity**, with a small **evolution metrics** placeholder for future Spark-like features. The focus is on “see it working, see the queue” first; memories, insights, and tool/agent views can follow in later iterations.

---

## Using this PRD with Ralph

- **Markdown:** `tasks/prd-clawdbot-dashboard.md`
- **Ralph-ready JSON:** `prd-clawdbot-dashboard.json` (project root). Copy to `prd.json` in the repo where you're building the dashboard, ensure `progress.txt` exists, then run `./ralph.sh [max_iterations]`.
- **Branch:** `ralph/clawdbot-dashboard`
