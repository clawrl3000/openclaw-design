# GitHub Integration Setup

This document outlines the manual steps needed to complete the GitHub repository access implementation.

## 1. GitHub Personal Access Token (PAT)

A GitHub PAT is needed to invite collaborators to repositories. Follow these steps:

1. Go to GitHub Settings > Developer Settings > Personal Access Tokens > Fine-grained tokens
2. Create a new token for the `openclaw-design` account
3. Set the token to have access to repositories in the `openclaw-design` organization
4. Grant the following permissions:
   - **Repository permissions:**
     - Administration: Read
     - Contents: Read  
     - Metadata: Read
     - Pull requests: Read
     - Issues: Read
     - Actions: Read
   - **Account permissions:**
     - Members: Write (to invite collaborators)

5. Copy the token and add it to your environment variables:
   ```bash
   # In .env.local
   GITHUB_PAT=ghp_your_token_here
   ```

## 2. Create Skill Repositories

The following repositories need to be created in the `openclaw-design` GitHub account:

### Based on current marketplace skills:
- `kalshi-prediction-markets` - For the Clawshi skill
- `email-dominator` - For the Email Dominator skill  
- `seo-signals-skill` - For the SEO Signals skill
- `conversion-copy-critique` - For the Conversion Copy Critique skill
- `dopamine-learning` - For the Dopamine Learning skill
- `click-driver` - For the Click Driver skill

### Repository setup for each skill:
1. Create private repository in `openclaw-design` organization
2. Use the `SKILL_README_TEMPLATE.md` to create an excellent README.md
3. Include the SKILL.md file from the marketplace
4. Add any supporting files/assets
5. Set up proper directory structure:
   ```
   skill-name/
   ├── README.md           # ← Premium, detailed setup guide (use template)
   ├── SKILL.md           # ← The actual skill file for agents
   ├── assets/
   │   └── (images, files, etc.)
   └── examples/
       └── (usage examples)
   ```

### README Quality Standards
Each repository README must be **premium quality** using the provided template:

- **Crystal clear installation**: 30-second setup process
- **Real usage examples**: Show exactly what the skill does
- **Troubleshooting section**: Address common issues
- **Professional formatting**: Consistent with the template
- **Value proposition**: Make it obvious why this skill is worth purchasing

**Template location**: `/SKILL_README_TEMPLATE.md` in this repository

**Example READMEs**: See `/skill-repos/` folder for completed examples:
- `kalshi-prediction-markets/README.md`
- `email-dominator/README.md`  
- `seo-signals-skill/README.md`

## 3. Update Database with GitHub Repo Names

Run the database migration, then update existing skills with their GitHub repository names:

```sql
-- Example updates (adjust skill IDs as needed)
UPDATE skills SET github_repo = 'kalshi-prediction-markets' WHERE slug = 'kalshi-prediction-markets';
UPDATE skills SET github_repo = 'email-dominator' WHERE slug = 'email-dominator';
UPDATE skills SET github_repo = 'seo-signals-skill' WHERE slug = 'seo-signals-skill';
UPDATE skills SET github_repo = 'conversion-copy-critique' WHERE slug = 'conversion-copy-critique';
UPDATE skills SET github_repo = 'dopamine-learning' WHERE slug = 'dopamine-learning';
UPDATE skills SET github_repo = 'click-driver' WHERE slug = 'click-driver';
```

## 4. Premium User Experience Flow

The post-purchase experience is now **premium and frictionless**:

### Success Page (Enhanced)
- ✅ Prompts for GitHub username if not provided
- ✅ Shows step-by-step installation guide
- ✅ GitHub method prioritized over downloads
- ✅ Clear "30 seconds to install" messaging
- ✅ Fallback instructions for direct downloads

### Dashboard (Enhanced)  
- ✅ Comprehensive installation guide at top
- ✅ Step-by-step instructions for GitHub method
- ✅ Quick-copy terminal commands
- ✅ Troubleshooting section built-in
- ✅ "Get from GitHub" buttons prioritized over downloads

### Repository Experience
- ✅ Premium README formatting using template
- ✅ Clear value proposition and what's included
- ✅ 30-second installation process
- ✅ Real usage examples with context
- ✅ Troubleshooting and advanced usage
- ✅ Professional presentation throughout

## 5. Test the Complete Experience

1. Create a test purchase with a GitHub username set
2. Verify the **complete customer journey**:
   - ✅ Stripe webhook correctly triggers GitHub invitation
   - ✅ User receives GitHub invitation email  
   - ✅ Success page shows clear next steps
   - ✅ User can access repository after accepting invitation
   - ✅ Repository README provides excellent setup experience
   - ✅ Dashboard shows installation guide and repo access
   - ✅ Installation actually works in under 30 seconds

## 5. Deploy Changes

After setting up the GitHub integration:

1. Push changes to both remotes:
   ```bash
   git add .
   git commit -m "feat: add GitHub repository access for purchased skills"
   
   # Push to main repository
   git push origin main
   
   # Push to Vercel deployment remote
   git push vercel-deploy main
   ```

2. Verify environment variables are set in Vercel:
   - `GITHUB_PAT` - the personal access token
   - All other existing environment variables

3. Run database migration in production environment

## 6. User Communication

Consider updating:
- Purchase confirmation emails to mention GitHub access
- Skill descriptions to highlight GitHub repository access
- FAQ/Help documentation about GitHub integration
- Marketing materials to emphasize the benefit of source code access

## Troubleshooting

### Common issues:
- **PAT permissions**: Make sure the token has the right permissions for the organization
- **Repository visibility**: Repositories must be private for the invitation system to work
- **User not found**: GitHub usernames are case-sensitive and must exist
- **Webhook failures**: Check Stripe webhook logs and server logs for GitHub API errors

### Testing checklist:
- [ ] GitHub PAT is valid and has correct permissions
- [ ] All skill repositories exist and are private
- [ ] Database migration completed successfully
- [ ] Skills have github_repo field populated
- [ ] Webhook handles GitHub invitations correctly
- [ ] Dashboard displays GitHub information properly
- [ ] Success page GitHub form works
- [ ] Users receive and can accept GitHub invitations