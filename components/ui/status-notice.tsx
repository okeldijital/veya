import type { ReactNode } from "react";
import "./status-notice.css";

export type StatusNoticeVariant = "info" | "success" | "warning" | "error";

/**
 * Screen-reader announcement behaviour.
 * - "off" (default): no live region; for notices that are part of the static page content.
 * - "polite": role="status"; for non-urgent updates that appear dynamically.
 * - "assertive": role="alert"; only for urgent messages that appear dynamically.
 */
export type StatusNoticeLive = "off" | "polite" | "assertive";

export type StatusNoticeProps = {
  /** Visual and semantic variant. Defaults to "info". */
  variant?: StatusNoticeVariant;
  /** Optional heading. Falls back to the variant label (e.g. "Error"). */
  title?: string;
  /** The message to show. */
  children: ReactNode;
  className?: string;
  /** Announcement behaviour. Defaults to "off" (no live region). */
  live?: StatusNoticeLive;
};

const VARIANTS: Record<
  StatusNoticeVariant,
  { label: string; icon: string }
> = {
  info: { label: "Info", icon: "i" },
  success: { label: "Success", icon: "✓" },
  warning: { label: "Warning", icon: "!" },
  error: { label: "Error", icon: "×" },
};

const LIVE_ATTRIBUTES = {
  off: {},
  polite: { role: "status", "aria-live": "polite", "aria-atomic": true },
  assertive: { role: "alert", "aria-live": "assertive", "aria-atomic": true },
} as const;

export function StatusNotice({ variant = "info", title, children, className, live = "off" }: StatusNoticeProps) {
  const config = VARIANTS[variant];
  const classes = ["status-notice", `status-notice--${variant}`, className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...LIVE_ATTRIBUTES[live]}>
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
