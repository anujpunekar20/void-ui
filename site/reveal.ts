import { useEffect } from 'react';

// Page-wide reveal: every [data-reveal] block is hidden by CSS (motion
// permitting) until it scrolls into view, then its children cascade in
// reading order via --i. Blocks already on screen at load wait for the hero
// boot sequence (data-boot on <html>) so the page still reads top to bottom.
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.boot = '';
    const boot = window.setTimeout(() => delete root.dataset.boot, 1300);

    const blocks = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = '';
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    blocks.forEach((block) => {
      Array.from(block.children).forEach((child, i) =>
        (child as HTMLElement).style.setProperty('--i', String(i)),
      );
      io.observe(block);
    });

    return () => {
      window.clearTimeout(boot);
      io.disconnect();
    };
  }, []);
}
