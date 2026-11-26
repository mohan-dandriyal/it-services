"use client";

import {
  Briefcase,
  Calendar,
  Camera,
  CheckCircle2,
  Cloud,
  Code2,
  Globe,
  Handshake,
  Headset,
  Layers,
  Mail,
  MapPin,
  Phone,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const ICON_MAP: Record<string, ComponentType<LucideProps>> = {
  Code2,
  Cloud,
  ShieldCheck,
  Headset,
  Rocket,
  Layers,
  Handshake,
  Users,
  Calendar,
  CheckCircle2,
  Linkedin: Briefcase,
  Instagram: Camera,
  Youtube: Play,
  Github: Terminal,
  Phone,
  Mail,
  MapPin,
  Globe,
  Sparkles,
  // Legacy fallback mappings in case older icon names appear in JSON
  FaFacebookF: Globe,
  FaInstagram: Camera,
  FaLinkedinIn: Briefcase,
  FaYoutube: Play,
  FaUsers: Users,
  FaRegCalendarAlt: Calendar,
  FaRegCheckCircle: CheckCircle2,
  FaRing: Code2,
  FaGlassCheers: Cloud,
  FaBirthdayCake: Rocket,
  FaMapMarkedAlt: Layers,
};

interface LucideIconProps extends LucideProps {
  name: string;
}

export default function LucideIcon({ name, ...props }: LucideIconProps) {
  const IconComponent = ICON_MAP[name] ?? Sparkles;
  return <IconComponent {...props} />;
}
