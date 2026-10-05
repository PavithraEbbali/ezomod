import { Database, Globe, MessagesSquare, Network, PhoneCall, Target, Workflow, Zap, type LucideIcon } from "lucide-react";
import type { ServiceIcon as IconName } from "@/lib/services";

const ICONS: Record<IconName, LucideIcon> = {
  target: Target,
  zap: Zap,
  phone: PhoneCall,
  network: Network,
  workflow: Workflow,
  database: Database,
  message: MessagesSquare,
  globe: Globe,
};

export default function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden />;
}
