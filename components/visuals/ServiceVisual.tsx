import type { ComponentType } from "react";
import VoiceAgentVisual from "@/components/visuals/VoiceAgentVisual";

const VISUALS: Record<string, ComponentType> = {
  "ai-voice-agents": VoiceAgentVisual,
};

/** The coded hero visual for a service page, or nothing if that service has none yet. */
export default function ServiceVisual({ slug }: { slug: string }) {
  const Visual = VISUALS[slug];
  return Visual ? <Visual /> : null;
}
