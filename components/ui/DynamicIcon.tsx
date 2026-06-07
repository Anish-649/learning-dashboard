import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // Capitalize first letter to match Lucide export names
  const iconName = name.charAt(0).toUpperCase() + name.slice(1);
  const Icon = (LucideIcons as Record<string, React.ComponentType<LucideProps>>)[
    iconName
  ];

  if (!Icon) {
    const Fallback = LucideIcons.BookOpen;
    return <Fallback {...props} />;
  }

  return <Icon {...props} />;
}
