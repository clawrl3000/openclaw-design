# SEO Signals Analyzer

> **⚡ Analyze and optimize SEO performance with AI-powered insights, competitor research, and ranking strategies**

**Price**: $12.00 | **Category**: Marketing | **Instant Setup**: ~30 seconds

---

## 📦 What's Included

This skill teaches your AI agent to:

- **Analyze SEO performance** across technical, content, and authority factors
- **Research competitors** and identify ranking opportunities  
- **Optimize content** for search intent and semantic relevance
- **Track rankings** and measure improvement over time
- **Identify technical issues** that impact search visibility

Perfect for SEO professionals, content creators, digital marketers, and business owners wanting to improve their search rankings.

## 🚀 Quick Install

### Prerequisites

- ✅ OpenClaw agent running
- ✅ Agent has a `skills/` folder
- ✅ Optional: SEO tool API keys (Ahrefs, SEMrush, etc.)

### Installation (30 seconds)

1. **Download this skill**:
   ```bash
   # Option 1: Download ZIP from GitHub
   # Click "Code" → "Download ZIP" above
   
   # Option 2: Clone if you have git
   git clone https://github.com/openclaw-design/seo-signals-skill.git
   ```

2. **Copy to your agent**:
   ```bash
   # Copy just the SKILL.md file to your agent's skills folder
   cp seo-signals-skill/SKILL.md ~/path-to-your-agent/skills/
   
   # Or drag and drop SKILL.md into your agent's skills/ folder
   ```

3. **Restart your agent** (or wait for auto-reload if supported)

✅ **Done!** Your agent now has this skill and will use it automatically when relevant.

## 📋 What Gets Installed

```
your-agent/
├── skills/
│   ├── seo-signals-skill.skill      # ← The main skill file
│   └── ... (your other skills)
```

The `SKILL.md` file contains everything the agent needs — no additional setup required.

## 🎯 Usage Examples

### Example 1: Site Audit

**You ask**: "Analyze the SEO performance of my website: example.com"

**Your agent**: *Performs comprehensive SEO analysis covering technical factors (site speed, mobile-friendliness, crawlability), content quality (keyword optimization, semantic relevance, content gaps), and authority signals (backlink profile, domain strength). Provides prioritized action plan with specific improvements.*

---

### Example 2: Competitor Analysis

**You ask**: "What are my competitors ranking for that I'm not?"

**Your agent**: *Identifies your top organic competitors, analyzes their keyword portfolios, discovers high-value keywords you're missing, examines their content strategies and backlink sources. Creates actionable opportunities list with difficulty assessments and traffic potential.*

---

### Example 3: Content Optimization

**You ask**: "Optimize this blog post for 'best project management tools 2024'"

**Your agent**: *Analyzes search intent for target keyword, reviews current top-ranking content, identifies semantic keywords and related terms to include, optimizes title tags and meta descriptions, suggests content structure improvements, and recommends internal linking opportunities.*

## ⚙️ Configuration

This skill works out of the box using free tools and publicly available data.

**Enhanced Features** with API keys (optional):

```bash
# In your agent's .env file:
AHREFS_API_TOKEN=your_token_here
SEMRUSH_API_KEY=your_key_here
SCREAMING_FROG_PATH=/path/to/screaming-frog
```

**Supported Tools**:
- Ahrefs API (backlinks, keywords, competitors)
- SEMrush API (keyword research, position tracking)
- Google Search Console API (performance data)
- Screaming Frog (technical audits)

## 🔧 Troubleshooting

### Agent isn't using the skill

1. **Verify file location**: Make sure `SKILL.md` is in your agent's `skills/` folder
2. **Check file format**: The file should be plain text/markdown, not a Word doc
3. **Restart agent**: Some agents need a restart to pick up new skills
4. **Check logs**: Look for any error messages when the agent starts

### Skill triggers at wrong times

The skill activates when you mention: SEO, search rankings, keywords, competitors, site audit, organic traffic, Google rankings, search optimization, SERP analysis

If it's triggering incorrectly, try being more specific with your requests.

### API rate limiting

1. **Check quotas**: Most SEO APIs have daily/monthly limits
2. **Spread requests**: The skill includes intelligent rate limiting
3. **Use caching**: Results are cached to avoid duplicate API calls
4. **Fallback modes**: Skill degrades gracefully when APIs are unavailable

### Inaccurate data

1. **Verify domain**: Make sure you're analyzing the correct website
2. **Check recency**: SEO data can be 1-30 days old depending on the source
3. **Multiple sources**: Cross-reference data from different tools when possible
4. **Local results**: Rankings can vary by location and personalization

### Still having issues?

1. 🐛 **File an issue** in this repository with your agent type and the problem
2. 💬 **Join the discussion** in the Issues tab for community help
3. 📧 **Contact support** via the OpenClaw Marketplace

## 🛠️ Advanced Usage

### Analysis Categories

**Technical SEO**
- Site speed and Core Web Vitals
- Mobile-friendliness and responsive design
- Crawlability and indexation issues
- XML sitemaps and robots.txt
- Schema markup and structured data
- HTTPS and security factors

**Content Optimization**  
- Keyword research and mapping
- Search intent analysis
- Semantic keyword integration
- Content gap identification
- Title and meta optimization
- Internal linking strategy

**Authority Building**
- Backlink profile analysis
- Link building opportunities
- Competitor link strategies
- Domain authority tracking
- Toxic link identification
- Brand mention monitoring

### Reporting Features

The skill generates comprehensive reports including:
- Executive summaries with key metrics
- Prioritized action items with impact/effort scores
- Before/after comparisons for tracking progress
- Competitive benchmarking
- Keyword opportunity matrices
- Technical issue inventories

### Integration Capabilities

Works with popular SEO tools:
- ✅ Google Analytics & Search Console
- ✅ Ahrefs API
- ✅ SEMrush API  
- ✅ Moz API
- ✅ Screaming Frog
- ✅ PageSpeed Insights
- ✅ GTmetrix
- ✅ Lighthouse

## 📚 Learn More

- **How this works**: This skill uses OpenClaw's skill system to extend your agent's capabilities
- **Customize it**: Edit the `SKILL.md` file to adjust triggers, examples, or behavior  
- **Share feedback**: Use the Issues tab to suggest improvements or report bugs
- **Other skills**: Browse the [OpenClaw Marketplace](https://openclaw.design) for more skills

### SEO Resources
- [Google Search Central](https://developers.google.com/search)
- [Ahrefs Blog](https://ahrefs.com/blog/)
- [Search Engine Land](https://searchengineland.com/)
- [Moz Learning Center](https://moz.com/learn/seo)

---

## 📄 License & Support

**License**: MIT | **Support**: Issues tab above | **Updates**: Watch this repo for improvements

**Purchased from OpenClaw Marketplace** — thank you for supporting AI agent development! 🎉

---

### Quick Links

- 🏪 [Browse more skills](https://openclaw.design)
- 🤖 [OpenClaw Documentation](https://openclaw.design/docs)
- 💡 [Skill Development Guide](https://openclaw.design/docs/skills)
- 🆘 [Get Help](https://openclaw.design/support)