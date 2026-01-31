import { useEffect, useMemo, useRef, useState } from "react";
import {
  Cloud,
  Fan,
  Lightbulb,
  Mic,
  Plug,
  ShieldCheck,
  WifiOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type PanelMode = "embedded" | "sheet";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function useDragToExpand({
  minPx,
  maxPx,
  initial,
}: {
  minPx: number;
  maxPx: number;
  initial: number;
}) {
  const [px, setPx] = useState(() => minPx + (maxPx - minPx) * initial);
  const [isDragging, setIsDragging] = useState(false);

  const startYRef = useRef(0);
  const startPxRef = useRef(0);

  const setFromDelta = (dy: number) => {
    // dy > 0 means user is dragging down (collapse)
    // dy < 0 means user is dragging up (expand)
    const next = clamp01((startPxRef.current - dy - minPx) / (maxPx - minPx));
    setPx(minPx + (maxPx - minPx) * next);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    // Avoid scroll/gesture conflicts
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    startYRef.current = e.clientY;
    startPxRef.current = px;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dy = e.clientY - startYRef.current;
    setFromDelta(dy);
  };

  const snap = () => {
    const progress = clamp01((px - minPx) / (maxPx - minPx));
    const target = progress > 0.5 ? maxPx : minPx;
    setPx(target);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    snap();
  };

  const progress = useMemo(() => clamp01((px - minPx) / (maxPx - minPx)), [px, minPx, maxPx]);

  useEffect(() => {
    // If bounds change (responsive), keep progress but recompute px.
    setPx(minPx + (maxPx - minPx) * progress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPx, maxPx]);

  return {
    px,
    progress,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}

function StatusDot({ className }: { className?: string }) {
  return <span className={cn("inline-block size-2 rounded-full", className)} />;
}

export default function AutomationOverviewPanel({
  className,
  mode,
}: {
  className?: string;
  mode?: PanelMode;
}) {
  const isMobile = useIsMobile();
  const resolvedMode: PanelMode = mode ?? (isMobile ? "sheet" : "embedded");

  // Layout constants (keep simple & predictable)
  const minPx = resolvedMode === "sheet" ? 84 : 72; // still shows handle + a hint of header
  const maxPx = resolvedMode === "sheet" ? Math.min(window?.innerHeight ? window.innerHeight * 0.82 : 640, 720) : 420;

  const {
    px,
    progress,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = useDragToExpand({ minPx, maxPx, initial: 0 });

  const bodyOpacity = Math.min(1, Math.max(0, (progress - 0.1) / 0.4));
  const highlightOpacity = Math.min(1, Math.max(0, (progress - 0.25) / 0.35));
  const footerOpacity = Math.min(1, Math.max(0, (progress - 0.4) / 0.35));

  const wrapperClass =
    resolvedMode === "sheet"
      ? "fixed inset-x-0 bottom-0 z-40"
      : "relative w-full";

  return (
    <div className={cn(wrapperClass, className)}>
      <div
        className={cn(
          "mx-auto",
          resolvedMode === "sheet" ? "w-full max-w-2xl px-4 pb-4" : "w-full",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-t-[18px] border",
            "bg-background/30 backdrop-blur-md",
            "shadow-[0_20px_70px_-30px_hsl(var(--foreground)/0.35)]",
            "supports-[backdrop-filter]:bg-background/25",
            resolvedMode === "embedded" && "rounded-b-2xl",
            "transition-[height] duration-300",
            !isDragging && "ease-out",
          )}
          style={{ height: px }}
        >
          {/* Ambient tech glow */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -top-24 right-[-10%] size-[320px] rounded-full",
              "bg-gradient-to-br from-primary/25 to-secondary/15 blur-3xl",
              "transition-opacity duration-300",
            )}
            style={{ opacity: 0.25 + progress * 0.55 }}
          />

          {/* Drag handle */}
          <div
            className="absolute inset-x-0 top-0 z-10 flex flex-col items-center"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="button"
            aria-label="Drag to expand"
            style={{ touchAction: "none" }}
          >
            <div className="pt-3 pb-2">
              <div className="h-1.5 w-12 rounded-full bg-muted/70" />
            </div>
          </div>

          <div className="h-full w-full px-5 pt-10 pb-5 sm:px-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Automation Overview</h3>
                <p className="text-sm text-muted-foreground">Designed for Indian Homes</p>
              </div>
              <div className="flex items-center gap-2" aria-label="Live status">
                <StatusDot className="bg-primary" />
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
            </div>

            {/* Body */}
            <div
              className={cn(
                "mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2",
                "transition-all duration-300 ease-out",
              )}
              style={{
                opacity: bodyOpacity,
                transform: `translateY(${Math.round((1 - bodyOpacity) * 10)}px)`,
              }}
            >
              {[
                {
                  icon: Lightbulb,
                  title: "Lights & Fan Control",
                  desc: "Scene-based and room-wise automation",
                },
                {
                  icon: Mic,
                  title: "Voice Assistant Integration",
                  desc: "Hands-free smart control",
                },
                {
                  icon: Cloud,
                  title: "Local + Cloud Operation",
                  desc: "Works online and offline",
                },
                {
                  icon: ShieldCheck,
                  title: "Matter Protocol Ready",
                  desc: "Future-ready interoperability",
                },
                {
                  icon: Plug,
                  title: "Existing Switchboards",
                  desc: "Compatible retrofits",
                },
                {
                  icon: Fan,
                  title: "Smooth Control",
                  desc: "Reliable, low-latency switching",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={cn(
                    "group rounded-2xl border bg-card/30 p-4",
                    "transition-all duration-300",
                    "hover:border-primary/30 hover:bg-card/40",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-xl",
                        "bg-primary/10",
                        "shadow-[0_0_0_0_hsl(var(--primary)/0)]",
                        "transition-all duration-300",
                        "group-hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.45)]",
                      )}
                    >
                      <item.icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlight */}
            <div
              className="mt-4 transition-all duration-300 ease-out"
              style={{
                opacity: highlightOpacity,
                transform: `translateY(${Math.round((1 - highlightOpacity) * 10)}px)`,
              }}
            >
              <div className="flex items-center justify-between gap-3 rounded-2xl border bg-secondary/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium text-foreground">
                    <WifiOff className="size-3.5" />
                    Works even without Internet
                  </span>
                </div>
                <div className="flex items-center gap-2" aria-label="System indicators">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <StatusDot className="bg-primary" /> Local
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <StatusDot className="bg-secondary" /> Cloud
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="mt-4 transition-all duration-300 ease-out"
              style={{
                opacity: footerOpacity,
                transform: `translateY(${Math.round((1 - footerOpacity) * 10)}px)`,
              }}
            >
              <Button
                variant="glow"
                size="lg"
                className="w-full pulse active:scale-[0.98]"
                onClick={() => {
                  // Keep this UI-only; existing site already has contact/get-started routes.
                  window.location.href = "/get-started";
                }}
              >
                Get Free Consultation
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Drag down to collapse
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
