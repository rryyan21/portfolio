import type { ReactNode } from "react";
export default function ScenePanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`paper-panel ${className}`}>{children}</div>;
}
