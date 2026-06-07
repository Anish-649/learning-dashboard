import { icons } from "lucide-react";
import { createElement } from "react";

interface DynamicIconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

export function DynamicIcon({ name, className, style, size = 20 }: DynamicIconProps) {
  const iconName = name.charAt(0).toUpperCase() + name.slice(1) as keyof typeof icons;
  const icon = icons[iconName] ?? icons["BookOpen"];
  return createElement(icon, { className, style, size });
}
