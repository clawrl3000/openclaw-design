---
name: cost-optimizer
description: >
  Reduce OpenClaw API costs by up to 90% through intelligent model routing, prompt caching,
  and local model integration. Teaches your agent to match model capability to task complexity
  instead of sending everything to expensive frontier models.
---

# Cost Optimizer — Cut Your OpenClaw API Bill by 90%

Your OpenClaw agent is probably burning money right now. Here's how to fix it.

> *Based on [Kevin Simback's](https://x.com/KSimback) viral guide (200K+ views, 5K+ bookmarks). Rewritten and expanded for the OpenClaw skill format.*

---

## The Problem: Why OpenClaw Burns Money by Default

OpenClaw sends **everything** to your primary model. Heartbeats, sub-agent tasks, calendar lookups, web searches, cron jobs — all of it hits whatever model you've set as default.

If your primary is Opus 4.6 ($5/$25 per million tokens), you're paying frontier prices for work that a $0.30 model handles just fine.

### Where the Money Goes

The costs compound through several mechanisms:

- **Context accumulation**: Session history grows with every message. A mature session can hit 200K+ tokens, so even a simple follow-up carries enormous context overhead
- **System prompt re-injection**: Your `SOUL.md`, `AGENTS.md`, `MEMORY.md`, and skill descriptions (3,000–14,000 tokens) get re-sent with every single API call
- **Tool output bloat**: File listings, browser snapshots, and command outputs get logged into session history and re-transmitted on every turn
- **Heartbeat overhead**: A heartbeat running every 30 minutes on Opus = 48 full-context API calls per day
- **Cron job costs**: Each cron trigger creates a fresh conversation with full context injection. 96 triggers/day at 15-minute intervals can cost $10–20/day on Opus alone

**The good news**: A well-configured multi-model setup can cut monthly API costs by 80–90% while maintaining (or improving) output quality where it matters.

---

## Can You Use Claude Max with OpenClaw?

Short answer: **No.** It's against Anthropic's terms of service and people are getting banned for it. Don't risk your account. This guide is about optimizing your API spend legitimately.

---

## Model Pricing Cheat Sheet (Feb 2026)

### Anthropic
| Model | Input $/MTok | Output $/MTok | Best For |
|-------|-------------|--------------|----------|
| Opus 4.6 | $5.00 | $25.00 | Complex reasoning, architecture, creative |
| Sonnet 4.5 | $3.00 | $15.00 | Coding, analysis, nuanced tasks |
| Haiku 3.5 | $0.30 | $1.25 | Routine tasks, triage, simple lookups |

### OpenAI
| Model | Input $/MTok | Output $/MTok | Best For |
|-------|-------------|--------------|----------|
| GPT-5.2 Turbo | $2.50 | $10.00 | Coding, structured output |
| GPT-4o-mini | $0.15 | $0.60 | Classification, formatting |

### Open Models (via OpenRouter)
| Model | Input $/MTok | Output $/MTok | Best For |
|-------|-------------|--------------|----------|
| DeepSeek Chat | $0.27 | $1.10 | General tasks, coding |
| Gemini Flash 1.5 | $0.075 | $0.30 | Fast, cheap, routine |
| Kimi K2.5 | $0.50 | $2.00 | Reasoning at bargain prices |

The gap between Opus and Haiku is **16x on input, 20x on output**. That's the opportunity.

---

## Strategy 1: Intelligent Model Routing

The core principle: **match model capability to task complexity.**

### Task-to-Model Framework

| Task Type | Recommended Model | Why |
|-----------|------------------|-----|
| Heartbeats | Haiku 3.5 / Gemini Flash | Just checking if anything needs attention |
| Email triage | Haiku 3.5 | Classification and summarization |
| Calendar lookups | Haiku 3.5 / GPT-4o-mini | Simple data retrieval |
| Web searches | Haiku 3.5 | Formatting search results |
| Cron jobs (routine) | Haiku 3.5 | Scheduled checks, notifications |
| Coding tasks | Sonnet 4.5 / GPT-5.2 Turbo | Needs quality but not frontier |
| Complex analysis | Sonnet 4.5 | Nuanced reasoning |
| Architecture decisions | Opus 4.6 | Worth the premium |
| Creative writing | Opus 4.6 | Quality matters most here |
| Multi-step planning | Opus 4.6 | Complex reasoning chains |

### How to Set It Up

OpenClaw supports per-function model assignment. Start simple — classify 2-3 task types, monitor via logs, then expand.

In your cron jobs, explicitly set the model:
```yaml
# In your cron configuration, specify cheaper models for routine tasks
model: anthropic/claude-3-haiku-20240307
```

For heartbeats, configure a lightweight model since heartbeat checks rarely need frontier intelligence:
```yaml
heartbeat:
  model: anthropic/claude-3-haiku-20240307
```

Monitor what's happening:
```bash
openclaw logs --tail
```

### Building a Custom Router Skill

For more control, create a routing skill that matches task patterns to models:

```python
import re
from openclaw import Skill, Context

class RouterSkill(Skill):
    def __init__(self):
        self.rules = {
            r'code|debug|script': 'openai/gpt-5.2-turbo',
            r'email|schedule|remind': 'anthropic/claude-3-haiku-20240307',
            r'plan|strategy|brainstorm': 'anthropic/claude-3-opus-20240229',
            'default': 'google/gemini-flash-1.5'
        }

    async def execute(self, context: Context):
        prompt = context.message.content.lower()
        for pattern, model in self.rules.items():
            if isinstance(pattern, str) and re.search(pattern, prompt):
                context.llm_model = model
                break
```

Enable it:
```bash
openclaw skills enable router --path skills/router.py
```

---

## Strategy 2: Use OpenRouter for Auto-Routing

If you don't want to build custom routing logic, [OpenRouter](https://openrouter.ai) provides a built-in router that analyzes prompts and picks models automatically.

```yaml
llm:
  provider: openrouter
  routing:
    enabled: true
    rules:
      - task: "routine"
        model: "deepseek/deepseek-chat"
        max_cost: 0.50
      - task: "coding"
        model: "openai/gpt-5.2-turbo"
      - fallback: "anthropic/claude-3-haiku-20240307"
```

One API, 300+ models, hands-off routing. There's some latency overhead from the analysis step, but it's a great "set and forget" option.

---

## Strategy 3: ClawRouter (Purpose-Built for OpenClaw)

[ClawRouter](https://github.com/BlockRunAI/ClawRouter) is an open-source routing layer built specifically for OpenClaw. It uses a lightweight local classifier to analyze each query and route to the cheapest capable model.

### How It Classifies

ClawRouter scores requests on: query length, presence of code, reasoning markers, multi-step intent, tool usage signals, etc. Then routes to tiers:

- **Simple** → DeepSeek, Gemini Flash (~$0.27–0.60/MTok)
- **Medium** → GPT-4o-mini
- **Complex** → Claude Sonnet
- **Heavy reasoning/agentic** → Opus 4.6, Kimi K2.5

### Profiles

- **Auto** — balanced cost/quality (default)
- **Eco** — maximum savings (up to 95% on simple queries)
- **Premium** — best quality, still routes simple stuff down
- **Free** — zero-cost models only

---

## Strategy 4: Prompt Caching

One of the most underused optimizations. Your `SOUL.md`, `AGENTS.md`, and `MEMORY.md` get sent with every API call — that's 3,000–14,000 tokens of static content being re-processed every single time.

Prompt caching lets the provider remember the static parts. You pay full price once, then 90% less for every subsequent hit within the cache TTL.

### Configuration

```json
{
  "models": {
    "anthropic/claude-opus-4.6": {
      "cacheRetention": "long",
      "cacheSystemPrompts": true,
      "cacheThresholdTokens": 2048
    }
  }
}
```

### The Heartbeat + Caching Combo

Anthropic's extended cache stays warm for 55+ minutes. Set your heartbeat interval to 55 minutes (instead of the default 30) so every heartbeat hits warm cache.

Combined with routing heartbeats to Haiku:
- Base model: $0.30/MTok
- Cached system context: $0.03/MTok
- **Monthly heartbeat cost: ~$0.50 instead of $100+**

---

## Strategy 5: Local Models via Ollama

If you're running OpenClaw 24/7 with heavy automation, local models eliminate marginal costs entirely.

### When Local Makes Sense
- Consistent, predictable load (not bursty)
- Privacy-sensitive data that shouldn't hit external APIs
- High-volume, low-complexity tasks
- You have spare compute (server, gaming PC)

### When It Doesn't
- You need frontier capabilities
- Bursty workload (paying for idle hardware)
- Don't want to manage infrastructure

### Recommended Local Model

**Qwen 3 32B** is the current sweet spot for local OpenClaw deployments. Competitive with Sonnet 3.5 on many tasks, runs at 40+ tok/sec on a single RTX 4090.

You won't match Opus-tier models locally without a $14K Mac Studio, but for routine tasks that make up 80%+ of your agent's work, local models are effectively free after hardware costs.

---

## The Bottom Line

90% of what your agent does is routine work that doesn't need a $5/MTok model.

**The action plan:**
1. **Route heartbeats and cron jobs to Haiku** (immediate 10-20x savings on background tasks)
2. **Enable prompt caching** (90% off on system context re-injection)
3. **Align heartbeat interval with cache TTL** (55 min instead of 30)
4. **Use Sonnet for coding/analysis, Opus only for complex reasoning**
5. **Consider ClawRouter or OpenRouter** for automated routing
6. **Evaluate local models** if you have the hardware and consistent load

The tools exist. The models exist. Spend 30 minutes configuring this and your wallet will thank you.

---

*Original guide by [Kevin Simback](https://x.com/KSimback/status/2023362295166873743) (@KSimback), COO at Delphi Labs. Adapted with additional context for the OpenClaw skill ecosystem.*
