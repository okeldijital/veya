import type { ReactNode } from "react";
import "./status-notice.css";

export type StatusNoticeVariant = "info" | "success" | "warning" | "error";

export type StatusNoticeProps = {
  /** Visual and semantic variant. Defaults to "info". */
  variant?: StatusNoticeVariant;
  /** Optional heading. Falls back to the variant label (e.g. "Error"). */
  title?: string;
  /** The message to show. */
  children: ReactNode;
  className?: string;
};

const VARIANTS: Record<
  StatusNoticeVariant,
  { label: string; icon: string; role: "alert" | "status"; live: "assertive" | "polite" }
> = {
  info: { label: "Info", icon: "i", role: "status", live: "polite" },
  success: { label: "Success", icon: "✓", role: "status", live: "polite" },
  warning: { label: "Warning", icon: "!", role: "alert", live: "assertive" },
  error: { label: "Error", icon: "×", role: "alert", live: "assertive" },
};

export function StatusNotice({ variant = "info", title, children, className }: StatusNoticeProps) {
  const config = VARIANTS[variant];
  const classes = ["status-notice", `status-notice--${variant}`, className].filter(Boolean).join(" ");

  return (
    <div className={classes} role={config.role} aria-live={config.live} aria-atomic="true">
      <span className="status-notice__icon" aria-hidden="true">
        {config.icon}
      </span>
      <div className="status-notice__body">
        <p className="status-notice__title">
          <span className="status-notice__label">{config.label}</span>
          {title && <span>: {title}</span>}
        </p>
        <div className="status-notice__message">{children}</div>
      </div>
    </div>
  );
}
