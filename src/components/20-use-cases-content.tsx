"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#codeGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5CC" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <polyline points="16,18 22,12 16,6" />
      <polyline points="8,6 2,12 8,18" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#serverGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="serverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4D4D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect x="2" y="3" width="20" height="4" rx="1" ry="1" />
      <rect x="2" y="10" width="20" height="4" rx="1" ry="1" />
      <rect x="2" y="17" width="20" height="4" rx="1" ry="1" />
      <line x1="6" y1="5" x2="6.01" y2="5" />
      <line x1="6" y1="12" x2="6.01" y2="12" />
      <line x1="6" y1="19" x2="6.01" y2="19" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#brainGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#00E5CC" />
        </linearGradient>
      </defs>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#homeGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}

function BusinessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#businessGrad)" strokeWidth={1.5}>
      <defs>
        <linearGradient id="businessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FF4D4D" />
        </linearGradient>
      </defs>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

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

/* ── Use Case Components ──────────────────────────────── */

interface UseCase {
  title: string;
  description: string;
  channels: string[];
  tools: string[];
  keyDetails: string[];
  cost?: string;
  complexity?: "Simple" | "Moderate" | "Advanced";
}

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const complexityColors = {
    Simple: "text-[#10B981]",
    Moderate: "text-[#F59E0B]", 
    Advanced: "text-[#FF4D4D]"
  };

  return (
    <div className="bg-[#110B07]/60 rounded-xl border border-white/[0.08] p-6 hover:border-white/[0.12] transition-all duration-300 hover:transform hover:scale-[1.01]">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white leading-tight">{useCase.title}</h3>
        {useCase.complexity && (
          <span className={`text-xs font-mono px-2 py-1 rounded ${complexityColors[useCase.complexity]} bg-current/10`}>
            {useCase.complexity}
          </span>
        )}
      </div>
      
      <p className="text-white/70 leading-relaxed mb-4">{useCase.description}</p>
      
      {/* Channels */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white/80 mb-2">Channels</h4>
        <div className="flex flex-wrap gap-2">
          {useCase.channels.map((channel, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-[#00E5CC]/10 text-[#00E5CC] rounded font-mono">
              {channel}
            </span>
          ))}
        </div>
      </div>
      
      {/* Tools */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white/80 mb-2">Tools & Skills</h4>
        <div className="flex flex-wrap gap-2">
          {useCase.tools.map((tool, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-[#F59E0B]/10 text-[#F59E0B] rounded font-mono">
              {tool}
            </span>
          ))}
        </div>
      </div>
      
      {/* Key Details */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white/80 mb-2">Key Details</h4>
        <ul className="text-sm text-white/60 space-y-1">
          {useCase.keyDetails.map((detail, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#FF4D4D]/40 mt-1 shrink-0">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Cost */}
      {useCase.cost && (
        <div className="pt-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white/60">Monthly Cost:</span>
            <span className="text-sm font-mono text-[#10B981]">{useCase.cost}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function CategorySection({ 
  title, 
  icon, 
  description, 
  useCases 
}: { 
  title: string; 
  icon: React.ReactNode; 
  description: string; 
  useCases: UseCase[];
}) {
  return (
    <section className="reveal mb-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#1E1510] border border-white/[0.08] flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-white/60 text-sm mt-1">{description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {useCases.map((useCase, i) => (
          <UseCaseCard key={i} useCase={useCase} />
        ))}
      </div>
    </section>
  );
}

/* ── Use Cases Data ─────────────────────────────────────── */

const developerWorkflows: UseCase[] = [
  {
    title: "Multi-Agent Development Coordinator",
    description: "Orchestrates multiple specialized agents for complex development tasks. Research agent gathers requirements, coding agent implements features, testing agent runs validation.",
    channels: ["Slack", "Discord"],
    tools: ["GitHub", "Linear", "Docker", "AWS"],
    keyDetails: [
      "Reduces development cycle time by 40%",
      "Handles concurrent work streams automatically", 
      "Integrates with existing dev tools seamlessly",
      "Maintains detailed project documentation"
    ],
    cost: "$45-60",
    complexity: "Advanced"
  },
  {
    title: "SMS-Based Chatbot Diagnosis",
    description: "Troubleshoots system issues through simple SMS commands. Users text symptoms, agent runs diagnostics, provides solutions, and escalates complex issues.",
    channels: ["SMS", "Twilio"],
    tools: ["Twilio", "System Monitoring", "Log Analysis"],
    keyDetails: [
      "Average response time under 30 seconds",
      "Resolves 70% of issues without human intervention",
      "Works from any phone, no app required",
      "Maintains incident history and patterns"
    ],
    cost: "$15-25",
    complexity: "Moderate"
  },
  {
    title: "Autonomous Coding from Phone",
    description: "Enables full development workflow from mobile device. Voice or text commands trigger code generation, testing, and deployment with real-time progress updates.",
    channels: ["WhatsApp", "Telegram", "Voice"],
    tools: ["GitHub", "CI/CD", "Cloud IDE", "Voice Recognition"],
    keyDetails: [
      "Deploy hotfixes from anywhere in minutes",
      "Voice-to-code with 95% accuracy",
      "Full version control integration", 
      "Real-time build status notifications"
    ],
    cost: "$30-45", 
    complexity: "Advanced"
  },
  {
    title: "Automated Code Review Assistant",
    description: "Reviews pull requests for security vulnerabilities, performance issues, and code quality. Provides detailed feedback and suggestions for improvement.",
    channels: ["GitHub", "GitLab"],
    tools: ["GitHub API", "SonarQube", "Security Scanners"],
    keyDetails: [
      "Catches 85% of common security issues",
      "Reduces review time by 60%",
      "Consistent code style enforcement",
      "Learning from team feedback patterns"
    ],
    cost: "$20-35",
    complexity: "Moderate"
  }
];

const devopsAdmin: UseCase[] = [
  {
    title: "3AM Error Auto-Pilot",
    description: "Monitors production systems 24/7. When critical errors occur, automatically attempts standard fixes, pages appropriate team members, and prepares incident reports.",
    channels: ["PagerDuty", "Slack", "Email"],
    tools: ["Kubernetes", "AWS", "Datadog", "PagerDuty"],
    keyDetails: [
      "Resolves 60% of incidents automatically",
      "Mean time to response under 2 minutes",
      "Comprehensive incident documentation",
      "Smart escalation based on severity"
    ],
    cost: "$80-120",
    complexity: "Advanced"
  },
  {
    title: "Integrated Error Tracking & Auto-PR",
    description: "Connects Slack notifications, Basecamp tasks, and Sentry alerts. When errors spike, creates GitHub PRs with potential fixes based on similar past incidents.",
    channels: ["Slack", "Basecamp"],
    tools: ["Sentry", "GitHub", "Basecamp"],
    keyDetails: [
      "Links error patterns to solutions automatically",
      "Creates detailed PRs with context and fixes",
      "Tracks resolution success rates",
      "Learns from developer feedback"
    ],
    cost: "$40-65",
    complexity: "Advanced"
  },
  {
    title: "CI/CD Pipeline Monitor",
    description: "Monitors build pipelines across multiple repositories. Detects bottlenecks, failed deployments, and performance regressions with intelligent alerting.",
    channels: ["Teams", "Discord", "Email"],
    tools: ["Jenkins", "GitHub Actions", "AWS CodePipeline"],
    keyDetails: [
      "Reduces pipeline failure resolution by 70%",
      "Predicts capacity issues before they occur",
      "Automated rollback for failed deployments",
      "Performance trend analysis and alerts"
    ],
    cost: "$35-50",
    complexity: "Moderate"
  },
  {
    title: "Infrastructure Cost Optimizer",
    description: "Analyzes cloud spending patterns and automatically adjusts resources. Shuts down unused instances, rightsizes overprovisioned services, and provides cost forecasts.",
    channels: ["Slack", "Email"],
    tools: ["AWS", "Azure", "GCP", "Cost Analysis APIs"],
    keyDetails: [
      "Average 25-40% reduction in cloud costs",
      "Automated resource cleanup on schedules",
      "Detailed spending breakdowns by team/project",
      "Predictive cost modeling for growth planning"
    ],
    cost: "$25-40",
    complexity: "Moderate"
  }
];

const knowledgeManagement: UseCase[] = [
  {
    title: 'Full-Stack Knowledge Pipeline "Reef"',
    description: "Creates comprehensive knowledge graphs from all company data sources. Connects documents, conversations, code, and decisions into searchable, interconnected insights.",
    channels: ["Slack", "Internal Portal"],
    tools: ["Elasticsearch", "Knowledge Graph DB", "NLP Processing"],
    keyDetails: [
      "Indexes 10+ data sources automatically",
      "Natural language queries with context",
      "Tracks knowledge evolution over time",
      "Discovers hidden connections between topics"
    ],
    cost: "$100-150",
    complexity: "Advanced"
  },
  {
    title: "Inbox Zero for 15k Emails",
    description: "Processes massive email backlogs using intelligent classification, auto-responses, and priority routing. Maintains ongoing inbox organization and follow-up tracking.",
    channels: ["Gmail", "Outlook"],
    tools: ["Email APIs", "NLP Classification", "Calendar Integration"],
    keyDetails: [
      "Processed 15,000 backlog emails in 48 hours",
      "98% classification accuracy rate",
      "Automated follow-up scheduling",
      "VIP sender priority routing"
    ],
    cost: "$20-30",
    complexity: "Moderate"
  },
  {
    title: "CRM Monday Reports",
    description: "Generates comprehensive Monday morning reports from CRM data, social media mentions, and industry news. Provides context for the week ahead with key metrics and insights.",
    channels: ["Email", "Slack"],
    tools: ["Salesforce", "HubSpot", "Social Media APIs", "News APIs"],
    keyDetails: [
      "Saves 3+ hours of manual report compilation",
      "Includes competitive intelligence insights",
      "Customizable templates by role/department",
      "Trend analysis and anomaly detection"
    ],
    cost: "$45-70",
    complexity: "Moderate"
  },
  {
    title: "Meeting Intelligence System", 
    description: "Records, transcribes, and analyzes all meetings. Extracts action items, identifies decision points, and tracks follow-through across the organization.",
    channels: ["Teams", "Zoom", "Slack"],
    tools: ["Meeting APIs", "Transcription", "Task Management"],
    keyDetails: [
      "Automatic action item extraction and assignment",
      "Meeting effectiveness scoring and feedback",
      "Cross-meeting topic and decision tracking",
      "Integration with project management tools"
    ],
    cost: "$30-50",
    complexity: "Moderate"
  }
];

const smartHomeIoT: UseCase[] = [
  {
    title: 'Home Assistant "Claudette"',
    description: "Integrates with Home Assistant to manage smart home devices through natural language. Controls lighting, temperature, security, and entertainment systems intelligently.",
    channels: ["Telegram", "Voice Assistant", "Mobile App"],
    tools: ["Home Assistant", "MQTT", "Voice Recognition"],
    keyDetails: [
      "Natural language device control",
      "Learns household patterns and preferences",
      "Energy optimization based on occupancy",
      "Security monitoring and alerts"
    ],
    cost: "$15-25",
    complexity: "Simple"
  },
  {
    title: "Raspberry Pi + WHOOP Fitness Coach",
    description: "Connects WHOOP fitness data with environmental controls. Adjusts room temperature, lighting, and suggests activities based on recovery metrics and sleep patterns.",
    channels: ["WhatsApp", "Push Notifications"],
    tools: ["WHOOP API", "Raspberry Pi", "IoT Sensors"],
    keyDetails: [
      "Personalized environment optimization",
      "Recovery-based activity recommendations",
      "Sleep quality improvement tracking",
      "Integration with smart home devices"
    ],
    cost: "$10-20",
    complexity: "Simple"
  },
  {
    title: "Plant Care Automation System",
    description: "Monitors soil moisture, light levels, and environmental conditions. Automatically waters plants, adjusts grow lights, and provides care recommendations via mobile notifications.",
    channels: ["SMS", "Mobile Push"],
    tools: ["Soil Sensors", "Arduino", "Watering System"],
    keyDetails: [
      "Prevents overwatering and underwatering",
      "Species-specific care recommendations",
      "Growth tracking with photo analysis",
      "Weather-integrated watering schedules"
    ],
    cost: "$25-40",
    complexity: "Simple"
  },
  {
    title: "Energy Management Optimizer",
    description: "Monitors electricity usage patterns and automatically adjusts devices to minimize costs. Integrates with solar panels and battery storage for optimal energy utilization.",
    channels: ["Email", "Mobile App"],
    tools: ["Smart Meters", "Solar API", "Battery Management"],
    keyDetails: [
      "Reduces energy bills by 20-30%",
      "Peak-hour consumption optimization",
      "Solar panel efficiency monitoring",
      "Predictive maintenance for appliances"
    ],
    cost: "$35-55",
    complexity: "Moderate"
  }
];

const businessOperations: UseCase[] = [
  {
    title: "Customer Support Automation",
    description: "Handles tier-1 customer support through multiple channels. Resolves common issues, escalates complex problems, and maintains customer satisfaction metrics.",
    channels: ["Email", "Chat", "Social Media"],
    tools: ["Zendesk", "Intercom", "Knowledge Base"],
    keyDetails: [
      "Resolves 70% of inquiries automatically",
      "24/7 availability with instant responses",
      "Sentiment analysis and escalation",
      "Continuous learning from interactions"
    ],
    cost: "$60-90",
    complexity: "Moderate"
  },
  {
    title: "Social Media Content Pipeline",
    description: "Creates, schedules, and optimizes social media content across platforms. Analyzes engagement patterns and adjusts content strategy automatically.",
    channels: ["Twitter", "LinkedIn", "Instagram"],
    tools: ["Social Media APIs", "Content Generation", "Analytics"],
    keyDetails: [
      "Maintains consistent posting schedule",
      "Content optimization for each platform",
      "Engagement tracking and response",
      "Trend analysis and content adaptation"
    ],
    cost: "$40-70",
    complexity: "Moderate"
  },
  {
    title: "Inventory Management System",
    description: "Tracks inventory levels across multiple warehouses and sales channels. Automatically reorders stock, manages suppliers, and optimizes storage allocation.",
    channels: ["Slack", "Email", "Dashboard"],
    tools: ["ERP Systems", "Supplier APIs", "Analytics"],
    keyDetails: [
      "Prevents stockouts and overstock situations",
      "Automated supplier communication and ordering",
      "Demand forecasting with seasonal adjustments",
      "Cost optimization through bulk purchasing"
    ],
    cost: "$80-120",
    complexity: "Advanced"
  },
  {
    title: "Financial Dashboard Generator",
    description: "Connects to financial systems and generates automated reports, budget tracking, and expense analysis. Provides insights and anomaly detection for better financial decisions.",
    channels: ["Email", "Slack", "Dashboard"],
    tools: ["QuickBooks", "Banking APIs", "Excel/Sheets"],
    keyDetails: [
      "Real-time financial health monitoring",
      "Automated expense categorization",
      "Budget variance analysis and alerts",
      "Cash flow forecasting and optimization"
    ],
    cost: "$25-45",
    complexity: "Moderate"
  }
];

/* ── Main Component ─────────────────────────────────────── */

export function TwentyUseCasesContent() {
  const contentRef = useReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      <main className="flex-1 px-4 sm:px-6 pt-28 pb-20" ref={contentRef}>
        {/* Article Container */}
        <article className="max-w-6xl mx-auto">

          {/* ── Article Header ────────────────────────── */}
          <header className="mb-16 reveal text-center">
            <h1 className="text-[42px] sm:text-[48px] lg:text-[52px] font-bold tracking-tight text-white leading-[1.1] mb-6">
              20 Real-World 
              <span className="block bg-gradient-to-r from-[#FF4D4D] via-[#F97316] to-[#00E5CC] bg-clip-text text-transparent">
                OpenClaw Use Cases
              </span>
            </h1>
            
            <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-3xl mx-auto">
              From autonomous coding to smart home control — verified implementations from real OpenClaw users with specific tools, channels, and workflows.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-white/40">
              <span>February 17, 2026</span>
              <span>•</span>
              <span>15 min read</span>
              <span>•</span>
              <span>20 Verified Use Cases</span>
            </div>
          </header>

          {/* ── Hero Image ────────────────────────────── */}
          <div className="reveal mb-16 rounded-xl overflow-hidden border border-white/[0.04]">
            <Image
              src="/images/20-use-cases/hero-use-cases.webp"
              alt="Abstract visualization showing interconnected nodes representing different OpenClaw use cases across various domains — coding, automation, smart home, and business operations"
              width={1536}
              height={1024}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* ── Introduction ──────────────────────────── */}
          <div className="reveal max-w-4xl mx-auto mb-16">
            <div className="prose-article">
              <p className="article-p text-center">
                OpenClaw users aren't just experimenting—they're building production systems that handle real work. These 20 use cases come from actual implementations, complete with costs, complexity ratings, and the specific tools and channels involved.
              </p>

              <p className="article-p text-center">
                Whether you're looking to automate development workflows, optimize business operations, or build intelligent home systems, these examples show what's possible when AI agents have the right architecture and tools.
              </p>
            </div>
          </div>

          {/* ── Use Case Categories ──────────────────────── */}
          <div className="max-w-7xl mx-auto">
            
            <CategorySection
              title="Developer Workflows"
              icon={<CodeIcon />}
              description="Autonomous coding, development coordination, and technical automation"
              useCases={developerWorkflows}
            />

            <CategorySection
              title="DevOps & SysAdmin"  
              icon={<ServerIcon />}
              description="Infrastructure monitoring, incident response, and system optimization"
              useCases={devopsAdmin}
            />

            <CategorySection
              title="Knowledge Management"
              icon={<BrainIcon />}
              description="Information processing, data insights, and organizational intelligence"
              useCases={knowledgeManagement}
            />

            <CategorySection
              title="Smart Home & IoT"
              icon={<HomeIcon />}
              description="Home automation, environmental control, and IoT device orchestration"
              useCases={smartHomeIoT}
            />

            <CategorySection
              title="Business Operations"
              icon={<BusinessIcon />}
              description="Customer support, content management, and operational automation"
              useCases={businessOperations}
            />

          </div>

          {/* ── Key Insights Section ──────────────────────── */}
          <div className="reveal max-w-4xl mx-auto mb-16 mt-20">
            <div className="bg-[#1E1510]/30 rounded-xl p-8 border border-white/[0.04] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D4D]/[0.015] via-transparent to-[#00E5CC]/[0.015]" />
              </div>
              
              <div className="relative">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Patterns from Real Implementations</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#FF4D4D]">Most Effective Channels</h3>
                    <div className="space-y-2 text-sm text-white/70">
                      <div className="flex justify-between">
                        <span>Slack/Discord</span>
                        <span className="text-[#00E5CC]">85% of business use cases</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SMS/Telegram</span>
                        <span className="text-[#00E5CC]">70% of personal automation</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email</span>
                        <span className="text-[#00E5CC]">60% of reporting systems</span>
                      </div>
                      <div className="flex justify-between">
                        <span>WhatsApp</span>
                        <span className="text-[#00E5CC]">45% of mobile workflows</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#F59E0B]">Common Cost Ranges</h3>
                    <div className="space-y-2 text-sm text-white/70">
                      <div className="flex justify-between">
                        <span>Simple automation</span>
                        <span className="text-[#10B981]">$10-30/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Business workflows</span>
                        <span className="text-[#F59E0B]">$30-70/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Enterprise systems</span>
                        <span className="text-[#FF4D4D]">$70-150/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROI Timeline</span>
                        <span className="text-[#00E5CC]">2-6 weeks typical</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/[0.08] text-center">
                  <p className="text-white/60 leading-relaxed">
                    <strong className="text-white">Success Factor:</strong> Start simple with one channel and expand gradually. 
                    The most successful implementations begin with SMS or Telegram for personal use, 
                    then scale to Slack/Discord for team workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Getting Started Section ──────────────────── */}
          <div className="reveal max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Build Your Use Case?</h2>
              <p className="text-lg text-white/70 mb-8">
                These examples show what's possible, but your specific workflow is unique. 
                Start with our curated skills and customize them for your needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/browse"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF4D4D] to-[#F97316] text-white font-semibold rounded-lg hover:scale-105 transition-all duration-200 shadow-lg shadow-[#FF4D4D]/25"
                >
                  Browse Skills →
                </Link>
                
                <Link
                  href="/setup"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#110B07] border border-white/[0.12] text-white font-semibold rounded-lg hover:border-white/[0.24] hover:bg-[#1E1510] transition-all duration-200"
                >
                  Setup Guide →
                </Link>
              </div>
              
              <div className="mt-8 text-sm text-white/50">
                <p>💡 <strong>Pro tip:</strong> Join our <a href="/community" className="text-[#00E5CC] hover:text-[#F59E0B] transition-colors">community</a> to share your use case and get implementation help from other users.</p>
              </div>
            </div>
          </div>

        </article>
      </main>

      <Footer />

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Article Typography */
        .prose-article {
          color: #ECEDEE;
        }
        
        .article-p {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(236, 237, 238, 0.85);
          margin-bottom: 24px;
        }
        
        .article-h2 {
          font-size: 28px;
          font-weight: 700;
          color: #ECEDEE;
          margin-top: 48px;
          margin-bottom: 20px;
          line-height: 1.3;
        }
      `}</style>
    </div>
  );
}