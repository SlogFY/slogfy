import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type Highlight = {
  icon: LucideIcon;
  label: string;
};

type Props = {
  title?: string;
  highlights: Highlight[];
};

export default function ScrollStoryHighlights({ title, highlights }: Props) {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border/50 bg-card/10 backdrop-blur-sm">
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          {title ? (
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
          ) : null}

          <motion.ul
            className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
            variants={reduceMotion ? undefined : container}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.35 }}
          >
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <motion.li
                  key={h.label}
                  variants={reduceMotion ? undefined : item}
                  className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/20 px-4 py-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {h.label}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </div>
  );
}
