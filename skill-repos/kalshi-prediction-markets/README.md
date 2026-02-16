# Clawshi: Kalshi Prediction Markets

> **⚡ Trade prediction markets on Kalshi with AI-powered analysis and automated strategies**

**Price**: $9.00 | **Category**: Trading | **Instant Setup**: ~30 seconds

---

## 📦 What's Included

This skill teaches your AI agent to:

- **Trade Kalshi markets** with real-time market data and analysis
- **Analyze prediction accuracy** across different market categories
- **Execute trading strategies** based on probability assessments and edge detection
- **Monitor positions** and manage risk automatically

Perfect for traders wanting to leverage prediction markets, researchers analyzing market efficiency, and anyone interested in automated probability-based trading.

## 🚀 Quick Install

### Prerequisites

- ✅ OpenClaw agent running
- ✅ Agent has a `skills/` folder
- ✅ Kalshi API credentials (for live trading)

### Installation (30 seconds)

1. **Download this skill**:
   ```bash
   # Option 1: Download ZIP from GitHub
   # Click "Code" → "Download ZIP" above
   
   # Option 2: Clone if you have git
   git clone https://github.com/openclaw-design/kalshi-prediction-markets.git
   ```

2. **Copy to your agent**:
   ```bash
   # Copy just the SKILL.md file to your agent's skills folder
   cp kalshi-prediction-markets/SKILL.md ~/path-to-your-agent/skills/
   
   # Or drag and drop SKILL.md into your agent's skills/ folder
   ```

3. **Restart your agent** (or wait for auto-reload if supported)

✅ **Done!** Your agent now has this skill and will use it automatically when relevant.

## 📋 What Gets Installed

```
your-agent/
├── skills/
│   ├── kalshi-prediction-markets.skill      # ← The main skill file
│   └── ... (your other skills)
```

The `SKILL.md` file contains everything the agent needs — no additional setup required.

## 🎯 Usage Examples

### Example 1: Market Analysis

**You ask**: "What are the most promising Kalshi markets today?"

**Your agent**: *Analyzes current Kalshi markets, identifies undervalued opportunities based on probability assessments, compares to external data sources, and presents top 3 markets with reasoning and suggested position sizes.*

---

### Example 2: Position Management

**You ask**: "Check my Kalshi positions and suggest any adjustments"

**Your agent**: *Reviews all open positions, calculates current P&L, analyzes market movements since entry, identifies positions that should be closed or adjusted, and provides specific recommendations with risk analysis.*

---

### Example 3: Market Research

**You ask**: "Create a trading strategy for the 2024 election markets"

**Your agent**: *Analyzes historical election prediction accuracy, identifies key events that move markets, creates a systematic approach to timing entries and exits, and provides risk management guidelines specific to political prediction markets.*

## ⚙️ Configuration

This skill works out of the box with no configuration needed for analysis and research.

For **live trading**, add your Kalshi API credentials to your environment:

```bash
# In your agent's .env file:
KALSHI_API_KEY=your_api_key_here
KALSHI_API_SECRET=your_secret_here
KALSHI_ENVIRONMENT=prod  # or "demo" for testing
```

**Safety Note**: The skill starts in analysis-only mode. Live trading requires explicit confirmation and proper risk management setup.

## 🔧 Troubleshooting

### Agent isn't using the skill

1. **Verify file location**: Make sure `SKILL.md` is in your agent's `skills/` folder
2. **Check file format**: The file should be plain text/markdown, not a Word doc
3. **Restart agent**: Some agents need a restart to pick up new skills
4. **Check logs**: Look for any error messages when the agent starts

### Skill triggers at wrong times

The skill activates when you mention: Kalshi, prediction markets, trading strategies, market analysis, political betting, event contracts

If it's triggering incorrectly, try being more specific with your requests.

### API connection issues

1. **Verify credentials**: Check that your Kalshi API key and secret are correct
2. **Check environment**: Make sure `KALSHI_ENVIRONMENT` is set to "prod" or "demo"
3. **Test connection**: Ask your agent to "test Kalshi connection" 
4. **Rate limits**: Kalshi has API rate limits - the skill includes automatic retry logic

### Still having issues?

1. 🐛 **File an issue** in this repository with your agent type and the problem
2. 💬 **Join the discussion** in the Issues tab for community help
3. 📧 **Contact support** via the OpenClaw Marketplace

## 🛠️ Advanced Usage

### Custom Trading Strategies

Edit the `SKILL.md` file to add your own trading strategies:

```markdown
## Custom Strategy: [Your Strategy Name]
- Entry conditions: [when to enter]
- Exit conditions: [when to exit]  
- Risk management: [position sizing rules]
```

### Market Categories

The skill covers all Kalshi market categories:
- **Politics**: Elections, policy outcomes, approval ratings
- **Economics**: GDP, inflation, employment data
- **Weather**: Temperature records, hurricane activity
- **Sports**: Championship outcomes, award winners
- **Culture**: Box office results, award shows

## 📚 Learn More

- **How this works**: This skill uses OpenClaw's skill system to extend your agent's capabilities
- **Customize it**: Edit the `SKILL.md` file to adjust triggers, examples, or behavior  
- **Share feedback**: Use the Issues tab to suggest improvements or report bugs
- **Other skills**: Browse the [OpenClaw Marketplace](https://openclaw.design) for more skills
- **Kalshi API**: [Official Kalshi API Documentation](https://trading-api.readme.io/)

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
- 📊 [Visit Kalshi](https://kalshi.com)