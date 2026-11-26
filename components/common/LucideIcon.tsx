"use client";

import {
  Calendar,
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
  Rocket,
  ShieldCheck,
  Sparkles,
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
  Phone,
  Mail,
  MapPin,
  Globe,
  Sparkles,
  // Legacy fallback mappings in case older icon names appear in JSON
  FaFacebookF: Globe,
  FaUsers: Users,
  FaRegCalendarAlt: Calendar,
  FaRegCheckCircle: CheckCircle2,
  FaRing: Code2,
  FaGlassCheers: Cloud,
  FaBirthdayCake: Rocket,
  FaMapMarkedAlt: Layers,
};

const linkedinLogo = "M6.5 8.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM5 10h3v9H5zm5 0h3v1.25c.55-.9 1.56-1.5 2.85-1.5 2.35 0 3.15 1.5 3.15 3.7V19h-3v-4.95c0-1.2-.42-1.8-1.4-1.8-1.02 0-1.6.7-1.6 1.8V19h-3z";
const instagramLogo = "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z";
const youtubeLogo = "M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15V9l5.2 3Z";

const SOCIAL_LOGOS = new Map([
  ["Linkedin", linkedinLogo],
  ["FaLinkedinIn", linkedinLogo],
  ["Instagram", instagramLogo],
  ["FaInstagram", instagramLogo],
  ["Youtube", youtubeLogo],
  ["FaYoutube", youtubeLogo],
  ["Github", "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"],
]);

interface LucideIconProps extends LucideProps {
  name: string;
}

export default function LucideIcon({ name, size = 24, ...props }: LucideIconProps) {
  const logo = SOCIAL_LOGOS.get(name);

  if (logo) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d={logo} fillRule="evenodd" />
      </svg>
    );
  }

  const IconComponent = ICON_MAP[name] ?? Sparkles;
  return <IconComponent size={size} {...props} />;
}
