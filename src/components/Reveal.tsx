import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap, prefersReducedMotion } from "../lib/motion";

/**
 * Fades content up once when it scrolls into view.
 * Content is fully visible by default: without JS, or with reduced motion, nothing is hidden.
 */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const tween = gsap.from(el, {
        opacity: 0,
        y: 16,
        duration: 0.4,
        delay,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      cleanup = () => tween.scrollTrigger?.kill();
    });
    return () => { cancelled = true; cleanup?.(); };
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}
