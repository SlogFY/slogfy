import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
};

export default function IoTWaveBackground({ className }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={
        "pointer-events-none absolute inset-0 overflow-hidden " + (className ?? "")
      }
    >
      {/* Soft gradient glow blobs */}
      <motion.div
        className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-55%", "-45%", "-55%"],
                y: [-20, 10, -20],
                scale: [1, 1.08, 1],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 16, ease: "easeInOut", repeat: Infinity }
        }
      />
      <motion.div
        className="absolute -bottom-28 right-[-120px] h-[520px] w-[520px] rounded-full bg-secondary/10 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -40, 0],
                y: [0, -20, 0],
                scale: [1, 1.06, 1],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 18, ease: "easeInOut", repeat: Infinity }
        }
      />

      {/* IoT signal / connectivity wave lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="iotLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="35%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
            <stop offset="65%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M-100 360 C 120 260, 260 440, 420 340 S 760 250, 980 320 S 1180 390, 1320 300"
          fill="none"
          stroke="url(#iotLine)"
          strokeWidth="3"
          filter="url(#softGlow)"
          strokeLinecap="round"
          strokeDasharray="10 18"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -200] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 14, ease: "linear", repeat: Infinity }
          }
        />
        <motion.path
          d="M-100 260 C 80 200, 260 320, 420 260 S 760 180, 980 240 S 1180 300, 1320 220"
          fill="none"
          stroke="url(#iotLine)"
          strokeWidth="2"
          filter="url(#softGlow)"
          strokeLinecap="round"
          strokeDasharray="8 16"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -160] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 18, ease: "linear", repeat: Infinity }
          }
          opacity={0.7}
        />
      </svg>
    </div>
  );
}
