import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

/**
 * Hero backdrop: a small graph being partitioned by simulated annealing, the problem
 * class behind the QUBO work in Q-Rescue. Each node holds one of two states (cyan or
 * amber). Edges whose ends differ are "cut" and drawn brighter. The graph cools until
 * the partition settles; moving the pointer heats nearby nodes so they re-decide.
 *
 * Decorative only (aria-hidden). With reduced motion it draws one settled frame.
 * Pauses when off-screen or when the tab is hidden.
 */

interface Node { x: number; y: number; s: 1 | -1; nb: number[]; heat: number }

const CYAN = "59,201,219";
const AMBER = "242,179,61";

function build(w: number, h: number, count: number): Node[] {
  // Deterministic scatter (golden-angle spiral jittered) so the layout is stable per size.
  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    const r = Math.sqrt((i + 0.5) / count);
    const a = i * 2.399963;
    const jx = ((i * 9301 + 49297) % 233280) / 233280 - 0.5;
    const jy = ((i * 4271 + 12345) % 233280) / 233280 - 0.5;
    nodes.push({
      x: w * (0.5 + 0.56 * r * Math.cos(a) + jx * 0.06),
      y: h * (0.5 + 0.56 * r * Math.sin(a) + jy * 0.06),
      s: i % 2 ? 1 : -1,
      nb: [],
      heat: 0,
    });
  }
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3)
      .forEach((o) => { if (!n.nb.includes(o.j)) n.nb.push(o.j); if (!nodes[o.j].nb.includes(i)) nodes[o.j].nb.push(i); });
  });
  return nodes;
}

export function DecisionField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = prefersReducedMotion();
    let nodes: Node[] = [];
    let w = 0, h = 0, dpr = 1;
    let temp = 1.2;
    let raf = 0;
    let visible = true;
    let pointer: { x: number; y: number } | null = null;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = build(w, h, w < 640 ? 34 : 64);
      if (still) { for (let k = 0; k < 400; k++) step(0.05); draw(); }
    };

    // Max-cut flavour: a node prefers the opposite state to its neighbours.
    const step = (t: number) => {
      for (let k = 0; k < 3; k++) {
        const i = Math.floor(Math.random() * nodes.length);
        const n = nodes[i];
        const local = t + n.heat;
        const same = n.nb.reduce((a, j) => a + (nodes[j].s === n.s ? 1 : 0), 0);
        const delta = same - (n.nb.length - same); // energy change if we flip: > 0 means flipping helps
        if (delta > 0 || Math.random() < Math.exp(delta / Math.max(local, 0.02))) n.s = (n.s * -1) as 1 | -1;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (const j of n.nb) {
          if (j < i) continue;
          const m = nodes[j];
          const cut = m.s !== n.s;
          ctx.strokeStyle = cut ? `rgba(${CYAN},0.55)` : "rgba(232,234,237,0.10)";
          ctx.lineWidth = cut ? 1.3 : 0.7;
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
        }
      }
      for (const n of nodes) {
        const c = n.s === 1 ? CYAN : AMBER;
        const glow = 0.5 + Math.min(n.heat, 1) * 0.5;
        ctx.fillStyle = `rgba(${c},${glow})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, 3.2 + n.heat * 3, 0, 6.283); ctx.fill();
      }
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      temp = Math.max(0.06, temp * 0.9985);
      if (pointer) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d < 130) n.heat = Math.max(n.heat, 1 - d / 130);
        }
      }
      for (const n of nodes) n.heat *= 0.94;
      step(temp);
      draw();
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
      temp = Math.min(temp + 0.004, 0.5);
    };
    const onLeave = () => { pointer = null; };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    if (!still) {
      raf = requestAnimationFrame(frame);
      window.addEventListener("pointermove", onMove, { passive: true });
      canvas.parentElement?.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.parentElement?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="decision-field pointer-events-none absolute inset-0 size-full" />;
}
