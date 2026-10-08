import type { ComponentType } from "react";
import AutomationVisual from "@/components/visuals/AutomationVisual";
import ChatbotVisual from "@/components/visuals/ChatbotVisual";
import CrmVisual from "@/components/visuals/CrmVisual";
import FollowUpVisual from "@/components/visuals/FollowUpVisual";
import LeadGenVisual from "@/components/visuals/LeadGenVisual";
import MultiAgentVisual from "@/components/visuals/MultiAgentVisual";
import VoiceAgentVisual from "@/components/visuals/VoiceAgentVisual";
import WebsiteVisual from "@/components/visuals/WebsiteVisual";

const VISUALS: Record<string, ComponentType> = {
  "ai-lead-generation": LeadGenVisual,
  "ai-lead-follow-up": FollowUpVisual,
  "ai-voice-agents": VoiceAgentVisual,
  "multi-agent-ai-workflows": MultiAgentVisual,
  "ai-automation": AutomationVisual,
  "crm-automation": CrmVisual,
  "ai-chatbots": ChatbotVisual,
  "website-development": WebsiteVisual,
};

/** The coded hero visual for a service page. */
export default function ServiceVisual({ slug }: { slug: string }) {
  const Visual = VISUALS[slug];
  return Visual ? <Visual /> : null;
}
