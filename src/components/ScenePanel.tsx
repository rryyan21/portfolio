import type { ReactNode } from "react";

const panelClass =
  "rounded-3xl border border-white/12 bg-slate-950/[0.62] backdrop-blur-2xl shadow-[0_16px_72px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/30";

type ScenePanelProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Frosted overlay card — UI reads over bright “field” imagery (game-menu / HUD style).
 */
export default function ScenePanel({ children, className = "" }: ScenePanelProps) {
  return <div className={`${panelClass} ${className}`.trim()}>{children}</div>;
}
