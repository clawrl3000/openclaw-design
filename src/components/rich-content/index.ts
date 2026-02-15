/**
 * Rich content registry — maps skill slugs to their formatted content components.
 * This avoids a cascade of if/else branches in the detail page.
 */

import {
  ClawshiDescription, ClawshiTagline, ClawshiMobileTagline,
  getClawshiFeature, CLAWSHI_FEATURE_COUNT,
  getClawshiInclude, CLAWSHI_INCLUDE_COUNT,
} from "./clawshi";

import {
  MemorySystemDescription, MemorySystemTagline, MemorySystemMobileTagline,
  getMemoryFeature, MEMORY_FEATURE_COUNT,
  getMemoryInclude, MEMORY_INCLUDE_COUNT,
} from "./memory-system";

import {
  EmailResponderDescription, EmailResponderTagline, EmailResponderMobileTagline,
  getEmailFeature, EMAIL_FEATURE_COUNT,
  getEmailInclude, EMAIL_INCLUDE_COUNT,
} from "./email-responder";

import {
  SportsOddsDescription, SportsOddsTagline, SportsOddsMobileTagline,
  getSportsFeature, SPORTS_FEATURE_COUNT,
  getSportsInclude, SPORTS_INCLUDE_COUNT,
} from "./sports-odds";

import {
  PRReviewerDescription, PRReviewerTagline, PRReviewerMobileTagline,
  getPRFeature, PR_FEATURE_COUNT,
  getPRInclude, PR_INCLUDE_COUNT,
} from "./pr-reviewer";

import {
  SocialContentDescription, SocialContentTagline, SocialContentMobileTagline,
  getSocialFeature, SOCIAL_FEATURE_COUNT,
  getSocialInclude, SOCIAL_INCLUDE_COUNT,
} from "./social-content";

import {
  SmartHomeDescription, SmartHomeTagline, SmartHomeMobileTagline,
  getSmartHomeFeature, SMART_HOME_FEATURE_COUNT,
  getSmartHomeInclude, SMART_HOME_INCLUDE_COUNT,
} from "./smart-home";

import {
  MeetingNotesDescription, MeetingNotesTagline, MeetingNotesMobileTagline,
  getMeetingFeature, MEETING_FEATURE_COUNT,
  getMeetingInclude, MEETING_INCLUDE_COUNT,
} from "./meeting-notes";

export interface RichContent {
  Description: () => React.JSX.Element;
  Tagline: () => React.JSX.Element;
  MobileTagline: () => React.JSX.Element;
  getFeature: (i: number) => React.ReactNode;
  featureCount: number;
  getInclude: (i: number) => React.ReactNode;
  includeCount: number;
}

const REGISTRY: Record<string, RichContent> = {
  "kalshi-prediction-markets": {
    Description: ClawshiDescription,
    Tagline: ClawshiTagline,
    MobileTagline: ClawshiMobileTagline,
    getFeature: getClawshiFeature,
    featureCount: CLAWSHI_FEATURE_COUNT,
    getInclude: getClawshiInclude,
    includeCount: CLAWSHI_INCLUDE_COUNT,
  },
  "openclaw-memory-system": {
    Description: MemorySystemDescription,
    Tagline: MemorySystemTagline,
    MobileTagline: MemorySystemMobileTagline,
    getFeature: getMemoryFeature,
    featureCount: MEMORY_FEATURE_COUNT,
    getInclude: getMemoryInclude,
    includeCount: MEMORY_INCLUDE_COUNT,
  },
  "smart-email-responder": {
    Description: EmailResponderDescription,
    Tagline: EmailResponderTagline,
    MobileTagline: EmailResponderMobileTagline,
    getFeature: getEmailFeature,
    featureCount: EMAIL_FEATURE_COUNT,
    getInclude: getEmailInclude,
    includeCount: EMAIL_INCLUDE_COUNT,
  },
  "sports-odds-analyzer": {
    Description: SportsOddsDescription,
    Tagline: SportsOddsTagline,
    MobileTagline: SportsOddsMobileTagline,
    getFeature: getSportsFeature,
    featureCount: SPORTS_FEATURE_COUNT,
    getInclude: getSportsInclude,
    includeCount: SPORTS_INCLUDE_COUNT,
  },
  "github-pr-reviewer": {
    Description: PRReviewerDescription,
    Tagline: PRReviewerTagline,
    MobileTagline: PRReviewerMobileTagline,
    getFeature: getPRFeature,
    featureCount: PR_FEATURE_COUNT,
    getInclude: getPRInclude,
    includeCount: PR_INCLUDE_COUNT,
  },
  "social-content-engine": {
    Description: SocialContentDescription,
    Tagline: SocialContentTagline,
    MobileTagline: SocialContentMobileTagline,
    getFeature: getSocialFeature,
    featureCount: SOCIAL_FEATURE_COUNT,
    getInclude: getSocialInclude,
    includeCount: SOCIAL_INCLUDE_COUNT,
  },
  "smart-home-orchestrator": {
    Description: SmartHomeDescription,
    Tagline: SmartHomeTagline,
    MobileTagline: SmartHomeMobileTagline,
    getFeature: getSmartHomeFeature,
    featureCount: SMART_HOME_FEATURE_COUNT,
    getInclude: getSmartHomeInclude,
    includeCount: SMART_HOME_INCLUDE_COUNT,
  },
  "meeting-notes-pro": {
    Description: MeetingNotesDescription,
    Tagline: MeetingNotesTagline,
    MobileTagline: MeetingNotesMobileTagline,
    getFeature: getMeetingFeature,
    featureCount: MEETING_FEATURE_COUNT,
    getInclude: getMeetingInclude,
    includeCount: MEETING_INCLUDE_COUNT,
  },
};

/** Get rich content for a skill slug. Returns undefined if no rich content exists. */
export function getRichContent(slug: string): RichContent | undefined {
  return REGISTRY[slug];
}
