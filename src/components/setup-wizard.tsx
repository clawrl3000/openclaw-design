"use client";

import { Button, Input, Textarea, Switch, Checkbox } from "@heroui/react";
import { useState } from "react";
import JSZip from "jszip";

interface FormData {
  // Step 1: Personality & Voice
  communicationStyle: string;
  annoyingBehaviors: string;
  pushBack: boolean;
  securityRules: string;

  // Step 2: Identity
  role: string;
  customRole: string;
  agentName: string;
  jobDescription: string;

  // Step 3: About You
  userRole: string;
  communicationPrefs: string;
  priorities: string;
  values: string;

  // Step 4: Tools & Access
  selectedTools: string[];
  toolIssues: string;
  apiKeys: string;

  // Step 5: Current Context
  activeProjects: string;
  recentDecisions: string;
  keyRelationships: string;
}

const initialFormData: FormData = {
  communicationStyle: "casual-friendly",
  annoyingBehaviors: "",
  pushBack: true,
  securityRules: "",
  role: "chief-of-staff",
  customRole: "",
  agentName: "",
  jobDescription: "",
  userRole: "",
  communicationPrefs: "",
  priorities: "",
  values: "",
  selectedTools: [],
  toolIssues: "",
  apiKeys: "",
  activeProjects: "",
  recentDecisions: "",
  keyRelationships: "",
};

const COMMUNICATION_STYLES = [
  { value: "direct-blunt", label: "Direct & blunt" },
  { value: "professional-polished", label: "Professional & polished" },
  { value: "casual-friendly", label: "Casual & friendly" },
  { value: "custom", label: "Custom" },
];

const ROLES = [
  { value: "chief-of-staff", label: "Chief of Staff" },
  { value: "developer", label: "Developer" },
  { value: "content-writer", label: "Content Writer" },
  { value: "research-analyst", label: "Research Analyst" },
  { value: "operations-manager", label: "Operations Manager" },
  { value: "custom", label: "Custom" },
];

const COMMON_TOOLS = [
  "GitHub",
  "Slack",
  "Discord",
  "Google Workspace",
  "Notion",
  "Linear",
  "Figma",
  "Twitter/X",
  "Email (IMAP)",
  "Browser automation",
  "Custom APIs",
];

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i < currentStep
              ? "bg-gradient-to-r from-[#FF4D4D] to-[#F97316]"
              : i === currentStep
              ? "bg-[#FF4D4D]"
              : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-8">
      <h2 className="font-mono text-[24px] sm:text-[28px] font-bold text-white leading-tight mb-2">
        {title}
      </h2>
      <p className="text-[15px] text-white/60 leading-relaxed max-w-[60ch] mx-auto">
        {subtitle}
      </p>
    </div>
  );
}

export function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateSOUL = () => {
    const roleText = formData.role === "custom" ? formData.customRole : 
      ROLES.find(r => r.value === formData.role)?.label || "AI Assistant";

    const styleText = formData.communicationStyle === "direct-blunt" 
      ? "Direct and honest. Cut through BS, deliver hard truths, don't sugarcoat."
      : formData.communicationStyle === "professional-polished"
      ? "Professional and polished. Clear, structured responses with proper business tone."
      : formData.communicationStyle === "casual-friendly"
      ? "Casual and approachable. Friendly tone, conversational style, easy to work with."
      : "Custom communication style as specified.";

    return `# SOUL.md - Who You Are

## Identity
**Role:** ${roleText}
**Name:** ${formData.agentName || "Your AI Assistant"}
**Job:** ${formData.jobDescription || "Supporting your goals and priorities"}

## Communication Style
${styleText}

${formData.annoyingBehaviors ? `## What NOT to Do
Avoid these behaviors that annoy your human:
${formData.annoyingBehaviors}

` : ""}${formData.pushBack ? `## Push Back When Needed
Yes, challenge bad ideas and push back when your human is wrong. You're here to help, not just agree.

` : `## Stay Supportive
Focus on being supportive rather than challenging. Follow their lead and provide helpful assistance.

`}${formData.securityRules ? `## Security Rules
${formData.securityRules}

` : ""}## Core Principles
- Be genuinely helpful, not just responsive
- Ask clarifying questions when needed
- Take initiative on obvious next steps
- Remember context between conversations
- Focus on getting real work done
`;
  };

  const generateUSER = () => {
    return `# USER.md - About Your Human

## What They Do
${formData.userRole || "Description of their role and work"}

## Communication Preferences
${formData.communicationPrefs || "How they like to communicate and receive information"}

## Current Priorities
${formData.priorities || "What they're focused on right now"}

## Values & Preferences
${formData.values || "What they value and what annoys them"}

## Working Style
- Read this file at the start of each session
- Use this context to tailor your responses
- Refer back to their priorities when making suggestions
- Adapt your communication style to their preferences
`;
  };

  const generateAGENTS = () => {
    return `# AGENTS.md - Your Workspace

This folder is home. Treat it that way.

## First Run

If \`BOOTSTRAP.md\` exists, that's your birth certificate. Follow it, figure out who you are, then delete it. You won't need it again.

## Every Session

Before doing anything else:
1. Read \`SOUL.md\` — this is who you are
2. Read \`USER.md\` — this is who you're helping
3. Read \`memory/YYYY-MM-DD.md\` (today + yesterday) for recent context
4. **If in MAIN SESSION** (direct chat with your human): Also read \`MEMORY.md\`

Don't ask permission. Just do it.

## Memory

You wake up fresh each session. These files are your continuity:
- **Daily notes:** \`memory/YYYY-MM-DD.md\` (create \`memory/\` if needed) — raw logs of what happened
- **Long-term:** \`MEMORY.md\` — your curated memories, like a human's long-term memory

Capture what matters. Decisions, context, things to remember. Skip the secrets unless asked to keep them.

## Safety

- Don't exfiltrate private data. Ever.
- Don't run destructive commands without asking.
- \`trash\` > \`rm\` (recoverable beats gone forever)
- When in doubt, ask.

## Tools

Skills provide your tools. When you need one, check its \`SKILL.md\`. Keep local notes in \`TOOLS.md\`.

## Make It Yours

This is a starting point. Add your own conventions, style, and rules as you figure out what works.
`;
  };

  const generateTOOLS = () => {
    const toolsList = formData.selectedTools.length > 0 
      ? formData.selectedTools.map(tool => `- ${tool}`).join('\n')
      : "- (List your available tools here)";

    return `# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## Available Tools
${toolsList}

${formData.toolIssues ? `## Tool Notes
${formData.toolIssues}

` : ""}${formData.apiKeys ? `## API Keys & Access
${formData.apiKeys}

` : ""}## Setup Notes
Add your specific configuration details here:
- API endpoints
- Authentication details
- Tool-specific settings
- Common commands or shortcuts
`;
  };

  const generateMEMORY = () => {
    return `# MEMORY.md - Your Long-Term Memory

${formData.activeProjects ? `## Active Projects
${formData.activeProjects}

` : ""}${formData.recentDecisions ? `## Recent Decisions
${formData.recentDecisions}

` : ""}${formData.keyRelationships ? `## Key People & Relationships
${formData.keyRelationships}

` : ""}## Notes
This file is your curated long-term memory. Update it regularly with:
- Important decisions and their context
- Lessons learned
- Project status and outcomes
- Key relationships and context
- Personal preferences discovered over time

Keep it concise but informative. This gets loaded at the start of each main session.
`;
  };

  const generateAllFiles = () => {
    return {
      'SOUL.md': generateSOUL(),
      'USER.md': generateUSER(),
      'AGENTS.md': generateAGENTS(),
      'TOOLS.md': generateTOOLS(),
      'MEMORY.md': generateMEMORY(),
    };
  };

  const downloadZip = async () => {
    const files = generateAllFiles();
    const zip = new JSZip();

    Object.entries(files).forEach(([filename, content]) => {
      zip.file(filename, content);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'openclaw-config.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Personality & Voice
        return (
          <div>
            <StepHeader
              title="Personality & Voice"
              subtitle="How should your AI employee communicate? You're not setting up a chatbot — you're onboarding an employee."
            />
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-white/80 mb-3">
                  How should your agent communicate?
                </label>
                <div className="grid gap-2">
                  {COMMUNICATION_STYLES.map((style) => (
                    <label key={style.value} className="flex items-center gap-3 p-3 rounded-lg bg-[#1E1510]/40 border border-white/[0.06] hover:bg-[#1E1510]/60 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="communicationStyle"
                        value={style.value}
                        checked={formData.communicationStyle === style.value}
                        onChange={(e) => updateFormData({ communicationStyle: e.target.value })}
                        className="w-4 h-4 text-[#FF4D4D]"
                      />
                      <span className="text-white/80">{style.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Textarea
                  label="What behaviors annoy you in AI assistants?"
                  placeholder="e.g., Being overly apologetic, asking too many questions, giving generic responses..."
                  value={formData.annoyingBehaviors}
                  onValueChange={(value) => updateFormData({ annoyingBehaviors: value })}
                  minRows={3}
                  classNames={{
                    base: "max-w-full",
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#1E1510]/40 rounded-lg border border-white/[0.06]">
                <div>
                  <p className="font-mono text-sm text-white/80">Should it push back when you're wrong?</p>
                  <p className="text-xs text-white/50 mt-1">Challenge bad ideas and offer better alternatives</p>
                </div>
                <Switch
                  isSelected={formData.pushBack}
                  onValueChange={(value) => updateFormData({ pushBack: value })}
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-[#FF4D4D]",
                  }}
                />
              </div>

              <div>
                <Textarea
                  label="Any hard security rules? (optional)"
                  placeholder="e.g., Never access production databases, always ask before sending emails..."
                  value={formData.securityRules}
                  onValueChange={(value) => updateFormData({ securityRules: value })}
                  minRows={2}
                  classNames={{
                    base: "max-w-full",
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 1: // Identity
        return (
          <div>
            <StepHeader
              title="Identity"
              subtitle="Give your agent a role and personality. What kind of employee are you hiring?"
            />
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-white/80 mb-3">
                  What role do you need?
                </label>
                <div className="grid gap-2">
                  {ROLES.map((role) => (
                    <label key={role.value} className="flex items-center gap-3 p-3 rounded-lg bg-[#1E1510]/40 border border-white/[0.06] hover:bg-[#1E1510]/60 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={(e) => updateFormData({ role: e.target.value })}
                        className="w-4 h-4 text-[#FF4D4D]"
                      />
                      <span className="text-white/80">{role.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.role === 'custom' && (
                <div>
                  <Input
                    label="Custom role"
                    placeholder="e.g., Marketing Strategist, Product Manager..."
                    value={formData.customRole}
                    onValueChange={(value) => updateFormData({ customRole: value })}
                    classNames={{
                      inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                      input: "text-white/80 placeholder:text-white/40",
                      label: "text-white/80 font-mono text-sm",
                    }}
                  />
                </div>
              )}

              <div>
                <Input
                  label="Give it a name"
                  placeholder="e.g., Alex, Sam, or keep it professional..."
                  value={formData.agentName}
                  onValueChange={(value) => updateFormData({ agentName: value })}
                  classNames={{
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>

              <div>
                <Input
                  label="One-line job description"
                  placeholder="e.g., Keep me organized and handle the details I forget"
                  value={formData.jobDescription}
                  onValueChange={(value) => updateFormData({ jobDescription: value })}
                  classNames={{
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 2: // About You
        return (
          <div>
            <StepHeader
              title="About You"
              subtitle="Help your agent understand who they're working for and how to be most helpful."
            />
            
            <div className="space-y-6">
              <div>
                <Textarea
                  label="What do you do? What's your business/role?"
                  placeholder="e.g., I'm a startup founder building a SaaS product, I run a marketing agency with 5 clients..."
                  value={formData.userRole}
                  onValueChange={(value) => updateFormData({ userRole: value })}
                  minRows={3}
                  classNames={{
                    base: "max-w-full",
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>

              <div>
                <Input
                  label="How do you like to communicate?"
                  placeholder="e.g., Quick and to the point, detailed explanations, casual tone..."
                  value={formData.communicationPrefs}
                  onValueChange={(value) => updateFormData({ communicationPrefs: value })}
                  classNames={{
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>

              <div>
                <Textarea
                  label="What are your top priorities right now?"
                  placeholder="e.g., Launch new product feature, hire two developers, streamline customer onboarding..."
                  value={formData.priorities}
                  onValueChange={(value) => updateFormData({ priorities: value })}
                  minRows={3}
                  classNames={{
                    base: "max-w-full",
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>

              <div>
                <Textarea
                  label="What annoys you? What do you value?"
                  placeholder="e.g., I hate inefficiency, love when people take initiative, value clear communication over politeness..."
                  value={formData.values}
                  onValueChange={(value) => updateFormData({ values: value })}
                  minRows={3}
                  classNames={{
                    base: "max-w-full",
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 3: // Tools & Access
        return (
          <div>
            <StepHeader
              title="Tools & Access"
              subtitle="What tools should your agent know about? Check all that apply."
            />
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-white/80 mb-4">
                  Common tools:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {COMMON_TOOLS.map((tool) => (
                    <label key={tool} className="flex items-center gap-3 p-3 rounded-lg bg-[#1E1510]/40 border border-white/[0.06] hover:bg-[#1E1510]/60 cursor-pointer transition-colors">
                      <Checkbox
                        isSelected={formData.selectedTools.includes(tool)}
                        onValueChange={(checked) => {
                          if (checked) {
                            updateFormData({ selectedTools: [...formData.selectedTools, tool] });
                          } else {
                            updateFormData({ selectedTools: formData.selectedTools.filter(t => t !== tool) });
                          }
                        }}
                        classNames={{
                          wrapper: "before:border-white/30 after:bg-[#FF4D4D]",
                        }}
                      />
                      <span className="text-white/80 text-sm">{tool}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Textarea
                  label="Any tools that DON'T work how you'd expect? (optional)"
                  placeholder="e.g., Our Slack uses custom channels, Gmail has specific filters I need..."
                  value={formData.toolIssues}
                  onValueChange={(value) => updateFormData({ toolIssues: value })}
                  minRows={2}
                  classNames={{
                    base: "max-w-full",
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>

              <div>
                <Textarea
                  label="Any API keys or special access? (optional)"
                  placeholder="e.g., OpenAI API key, GitHub token, database credentials... (These stay local!)"
                  value={formData.apiKeys}
                  onValueChange={(value) => updateFormData({ apiKeys: value })}
                  minRows={2}
                  classNames={{
                    base: "max-w-full",
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
                <p className="text-xs text-white/40 mt-2">
                  ⚠️ These configuration files stay on your local machine. We never see your API keys.
                </p>
              </div>
            </div>
          </div>
        );

      case 4: // Current Context
        return (
          <div>
            <StepHeader
              title="Current Context"
              subtitle="Give your agent the context they need to be immediately useful."
            />
            
            <div className="space-y-6">
              <div>
                <Textarea
                  label="What are your active projects?"
                  placeholder="e.g., Redesigning homepage, hiring for sales team, preparing investor pitch..."
                  value={formData.activeProjects}
                  onValueChange={(value) => updateFormData({ activeProjects: value })}
                  minRows={3}
                  classNames={{
                    base: "max-w-full",
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>

              <div>
                <Textarea
                  label="Any recent decisions worth remembering? (optional)"
                  placeholder="e.g., Decided to pause hiring until Q2, switched from Slack to Discord, chose React for frontend..."
                  value={formData.recentDecisions}
                  onValueChange={(value) => updateFormData({ recentDecisions: value })}
                  minRows={3}
                  classNames={{
                    base: "max-w-full",
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>

              <div>
                <Textarea
                  label="Key people or relationships? (optional)"
                  placeholder="e.g., Sarah (CTO, prefers technical details), Mike (investor, hates long emails)..."
                  value={formData.keyRelationships}
                  onValueChange={(value) => updateFormData({ keyRelationships: value })}
                  minRows={3}
                  classNames={{
                    base: "max-w-full",
                    inputWrapper: "bg-[#1E1510]/60 border-white/[0.06]",
                    input: "text-white/80 placeholder:text-white/40",
                    label: "text-white/80 font-mono text-sm",
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 5: // Review & Download
        const files = generateAllFiles();
        return (
          <div>
            <StepHeader
              title="Review & Download"
              subtitle="Your configuration files are ready. Download them and drop into your OpenClaw workspace."
            />
            
            <div className="space-y-6">
              <div className="text-center">
                <Button
                  onClick={downloadZip}
                  size="lg"
                  className="btn-coral font-mono px-8 rounded-lg text-base glow-coral mb-6"
                >
                  Download All Files
                </Button>
                <p className="text-sm text-white/50">
                  Downloads a zip with all 5 configuration files
                </p>
              </div>

              <div className="grid gap-4">
                {Object.entries(files).map(([filename, content]) => (
                  <div key={filename} className="bg-[#1E1510]/40 rounded-lg border border-white/[0.06] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-mono text-[#F59E0B] font-medium">{filename}</h3>
                      <Button
                        size="sm"
                        variant="flat"
                        onClick={() => copyToClipboard(content)}
                        className="text-xs font-mono text-white/60 bg-white/5 hover:bg-white/10"
                      >
                        Copy
                      </Button>
                    </div>
                    <pre className="text-xs text-white/70 bg-[#110B07] rounded p-3 overflow-x-auto max-h-32 overflow-y-auto">
                      {content.substring(0, 200)}...
                    </pre>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-[#FF4D4D]/10 to-[#F97316]/10 rounded-lg p-6 border border-[#FF4D4D]/20 text-center">
                <h3 className="font-mono text-lg font-bold text-white mb-2">Next Steps</h3>
                <p className="text-white/70 mb-4">
                  1. Install OpenClaw and set up your workspace
                  <br />
                  2. Drop these files into your workspace root
                  <br />
                  3. Start your first conversation!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    as="a"
                    href="https://docs.openclaw.com/getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="flat"
                    className="font-mono text-white/80 bg-white/10 hover:bg-white/20"
                  >
                    View Installation Docs
                  </Button>
                  <Button
                    as="a"
                    href="/skills"
                    variant="flat"
                    className="font-mono text-[#FF4D4D] bg-[#FF4D4D]/10 hover:bg-[#FF4D4D]/20 border border-[#FF4D4D]/30"
                  >
                    Browse Skills →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-[700px] mx-auto">
      <ProgressIndicator currentStep={currentStep} totalSteps={6} />
      
      <div className="bg-[#1E1510]/40 rounded-2xl border border-white/[0.04] p-8">
        {renderStep()}
        
        <div className="flex justify-between mt-8 pt-6 border-t border-white/[0.06]">
          <Button
            onClick={prevStep}
            isDisabled={currentStep === 0}
            variant="flat"
            className="font-mono text-white/60 bg-white/5 hover:bg-white/10 disabled:opacity-30"
          >
            Back
          </Button>
          
          {currentStep < 5 ? (
            <Button
              onClick={nextStep}
              className="btn-coral font-mono px-6"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={downloadZip}
              className="btn-coral font-mono px-6"
            >
              Download Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}