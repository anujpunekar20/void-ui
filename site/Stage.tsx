import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Live, StageData } from './stages';
import { Arrow } from './Arrow';

export const STORYBOOK = 'https://anujpunekar20.github.io/void-ui/';
export const docsUrl = (slug: string) => `${STORYBOOK}?path=/docs/components-${slug}--docs`;

// How long each state holds before the next one. The active chip's fill bar
// runs for the same time, so a visitor can see the next change coming.
export const STEP_MS = 2400;

const REDUCED =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface StageProps {
  data: StageData;
  initialHeld?: boolean;
  onHeldChange?: (held: boolean) => void;
  // Called instead of looping when the last state finishes (the picker uses
  // it to move on to the next component).
  onCycle?: () => void;
  // Which side the first specimen enters from (the picker passes the tab direction).
  dir?: Dir;
}

type Dir = 'next' | 'prev';

export function Stage({
  data,
  initialHeld = false,
  onHeldChange,
  onCycle,
  dir: initialDir = 'next',
}: StageProps) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<Dir>(initialDir);
  const [live, setLive] = useState<Live>(data.states[0].props);
  // The state being handed off: it slides out one side while the new state
  // slides in from the other. A visual copy only (aria-hidden + inert).
  const [ghost, setGhost] = useState<{ key: number; live: Live; dir: Dir } | null>(null);
  const [held, setHeldState] = useState(initialHeld);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const playing = !held && visible && !REDUCED;
  const titleId = `stage-${data.slug}`;

  function setHeld(next: boolean) {
    setHeldState(next);
    onHeldChange?.(next);
  }

  // Forward (and the loop back to the first state) enters from the right;
  // stepping back to an earlier chip enters from the left.
  function go(i: number, d: Dir = 'next') {
    if (!REDUCED) setGhost({ key: Date.now(), live, dir: d });
    setDir(d);
    setIndex(i);
    setLive(data.states[i].props);
  }

  // Only a stage that is actually on screen plays.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.35,
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      const next = index + 1;
      if (next === data.states.length && onCycle) onCycle();
      else go(next % data.states.length);
    }, STEP_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index]);

  // Touching the specimen hands it to the visitor: auto-play stops so the
  // control never changes under their pointer or cursor.
  const takeOver = () => !held && setHeld(true);

  return (
    <section
      ref={ref}
      className="stage"
      aria-labelledby={titleId}
      data-playing={playing || undefined}
      data-enter={initialDir}
      style={{ '--step': `${STEP_MS}ms` } as CSSProperties}
    >
      <div className="stage-body" onPointerDown={takeOver} onKeyDown={takeOver} onFocus={takeOver}>
        {ghost && (
          <div
            className="specimen ghost"
            key={ghost.key}
            data-dir={ghost.dir}
            style={{ width: data.width }}
            aria-hidden="true"
            {...{ inert: '' }}
            onAnimationEnd={(e) => e.target === e.currentTarget && setGhost(null)}
          >
            {data.render(ghost.live, () => {})}
          </div>
        )}
        {/* Keyed per state so each change replays the slide-in. Typing never
            changes the index, so a field never remounts mid-input. */}
        <div className="specimen" key={index} data-dir={dir} style={{ width: data.width }}>
          {data.render(live, (patch) => setLive((l) => ({ ...l, ...patch })))}
        </div>
      </div>

      <div className="stage-controls">
        <div className="chips" role="group" aria-label={`${data.name} states`}>
          {data.states.map((s, i) => (
            <button
              type="button"
              key={s.name}
              className="chip"
              aria-pressed={i === index}
              onClick={() => {
                go(i, i < index ? 'prev' : 'next');
                setHeld(true);
              }}
            >
              {s.name}
            </button>
          ))}
        </div>
        {!REDUCED && (
          <button
            type="button"
            className="chip stage-play"
            aria-pressed={!held}
            onClick={() => setHeld(!held)}
          >
            {held ? 'Play' : 'Pause'}
          </button>
        )}
      </div>

      <div className="stage-caption">
        <div>
          <h3 id={titleId}>{data.name}</h3>
          <p>{data.note}</p>
        </div>
        <a href={docsUrl(data.slug)} target="_blank" rel="noreferrer">
          Docs <Arrow />
        </a>
      </div>
    </section>
  );
}
