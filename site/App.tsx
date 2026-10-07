import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { version } from '../package.json';
import { Badge, Button, Checkbox, Input, Toggle } from '../src';
import { Arrow } from './Arrow';
import { STORYBOOK, Stage } from './Stage';
import { STAGES } from './stages';
import { useReveal } from './reveal';
import { ACCENTS, DEFAULT_THEME, SHADOWS, themeVars } from './theme';
import type { ThemeChoice } from './theme';

const INSTALL = 'npm i @anuj20/void-ui';
const GITHUB = 'https://github.com/anujpunekar20/void-ui';
const NPM = 'https://www.npmjs.com/package/@anuj20/void-ui';
const PORTFOLIO = 'https://anujpunekar.vercel.app';

function CopyKey({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch {
      setState('failed');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 1600);
  }

  return (
    <button
      type="button"
      className="key copy-key"
      data-state={state}
      onClick={copy}
      aria-live="polite"
    >
      {state === 'copied' ? 'Copied' : state === 'failed' ? 'Select to copy' : label}
    </button>
  );
}

function Install() {
  return (
    <div className="install">
      <code>
        <span className="prompt" aria-hidden="true">
          $
        </span>
        {INSTALL}
      </code>
      <CopyKey text={INSTALL} />
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <a className="mark" href="#top" aria-label="void-ui home">
        void/ui<span className="cursor">_</span>
      </a>
      <Badge variant="outline">v{version}</Badge>
      <a className="nav-link" href={GITHUB} target="_blank" rel="noreferrer">
        GitHub <Arrow />
      </a>
      <Button href={STORYBOOK} target="_blank" rel="noreferrer">
        Storybook ↗
      </Button>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <h1 className="wordmark">
        {/* Boot sequence: the name types itself in behind a caret. */}
        <span className="type" aria-hidden="true">
          <span className="wordmark-void">VOID</span>/UI
        </span>
        <span className="caret" aria-hidden="true">
          _
        </span>
        <span className="sr-only">void-ui, a React component library</span>
      </h1>
      <div className="hero-row">
        <p className="thesis">
          Dark-first React components with zero radius, hard zero-blur shadows, and one violet
          light.
        </p>
        <Install />
      </div>
    </header>
  );
}

function Showcase() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  // Once the visitor picks a tab or touches the stage, the picker stops
  // moving on by itself; the stage's Play key hands control back.
  const [manual, setManual] = useState(false);
  const data = STAGES[active];
  const tabsRef = useRef<HTMLDivElement>(null);
  const [ink, setInk] = useState({ x: 0, w: 0 });

  // One underline glides between tabs instead of jumping, and the strip
  // scrolls sideways (never the page) to keep the active tab in view.
  useLayoutEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !tab) return;
    setInk({ x: tab.offsetLeft, w: tab.offsetWidth });
    strip.scrollTo({ left: tab.offsetLeft - strip.clientWidth / 3, behavior: 'smooth' });
  }, [active]);

  return (
    <section className="showcase" id="components" aria-label="Components">
      <div className="tabs" role="group" aria-label="Pick a component" ref={tabsRef}>
        {STAGES.map((s, i) => (
          <button
            type="button"
            key={s.slug}
            className="tab"
            aria-pressed={i === active}
            onClick={() => {
              setManual(true);
              setDir(i < active ? 'prev' : 'next');
              setActive(i);
            }}
          >
            {s.name}
          </button>
        ))}
        <span
          className="tab-ink"
          aria-hidden="true"
          style={{ transform: `translateX(${ink.x}px)`, width: ink.w }}
        />
      </div>
      <Stage
        key={data.slug}
        data={data}
        initialHeld={manual}
        onHeldChange={setManual}
        dir={dir}
        onCycle={() => {
          setDir('next');
          setActive((i) => (i + 1) % STAGES.length);
        }}
      />
    </section>
  );
}

function cssBlock(vars: Record<string, string>) {
  const lines = Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`);
  return lines.length
    ? `:root {\n${lines.join('\n')}\n}`
    : ':root {\n  /* defaults from tokens.css */\n}';
}

function Theming() {
  const [choice, setChoice] = useState<ThemeChoice>(DEFAULT_THEME);
  const vars = themeVars(choice);

  useEffect(() => {
    const root = document.documentElement;
    const applied = themeVars(choice);
    Object.entries(applied).forEach(([k, v]) => root.style.setProperty(k, v));
    return () => Object.keys(applied).forEach((k) => root.style.removeProperty(k));
  }, [choice]);

  return (
    <section className="section" id="theming" aria-labelledby="theming-title">
      <div className="section-head" data-reveal>
        <h2 id="theming-title">Re-theme with plain CSS variables.</h2>
        <p>
          Every color is a <code>--void-*</code> custom property. Override one and every component
          follows, with no rebuild.
        </p>
      </div>
      <div className="theming-grid" data-reveal>
        <div className="theme-controls">
          <fieldset>
            <legend>Accent</legend>
            <div className="swatches">
              {ACCENTS.map((a) => (
                <button
                  type="button"
                  key={a.value}
                  className="swatch"
                  aria-pressed={choice.accent === a.value}
                  onClick={() => setChoice((c) => ({ ...c, accent: a.value }))}
                >
                  <span className="swatch-chip" style={{ background: a.value }} />
                  {a.name}
                </button>
              ))}
              <label className="swatch">
                <input
                  type="color"
                  value={choice.accent}
                  onChange={(e) => setChoice((c) => ({ ...c, accent: e.target.value }))}
                />
                Custom
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Shadow</legend>
            <div className="swatches">
              {SHADOWS.map((s) => (
                <button
                  type="button"
                  key={s}
                  className="swatch"
                  aria-pressed={choice.shadow === s}
                  onClick={() => setChoice((c) => ({ ...c, shadow: s }))}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
          <button type="button" className="key key-quiet" onClick={() => setChoice(DEFAULT_THEME)}>
            Reset
          </button>
        </div>
        <div className="theme-preview">
          <div className="preview-row">
            <Button>Save</Button>
            <Button variant="outline">Preview</Button>
            <Badge variant="accent">Live</Badge>
          </div>
          <Input label="Project" defaultValue="void-ui" />
          <div className="preview-row">
            <Toggle label="Preview deploys" defaultChecked />
            <Checkbox label="Run tests" defaultChecked />
          </div>
        </div>
        <div className="theme-code">
          <pre>
            <code>{cssBlock(vars)}</code>
          </pre>
          <CopyKey text={cssBlock(vars)} label="Copy CSS" />
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    title: 'Install',
    note: 'react and react-dom (>=18) are peer dependencies.',
    code: 'npm install @anuj20/void-ui react react-dom',
  },
  {
    title: 'Import the styles once',
    note: 'Tokens, the Kode Mono face, and every component style.',
    code: "import '@anuj20/void-ui/styles';",
  },
  {
    title: 'Use a component',
    note: 'Fully typed props, forwarded refs on floating components.',
    code: 'import { Button } from \'@anuj20/void-ui\';\n\nexport function App() {\n  return <Button variant="solid">Deploy</Button>;\n}',
  },
];

// The close is the install section: three steps, then the two ways out.
function Close() {
  return (
    <footer className="close" id="install" data-reveal>
      <h2>Three steps to ship.</h2>
      <ol className="steps" data-reveal>
        {STEPS.map((step) => (
          <li className="step" key={step.title}>
            <div className="step-text">
              <h3>{step.title}</h3>
              <p>{step.note}</p>
            </div>
            <div className="step-code">
              <pre>
                <code>{step.code}</code>
              </pre>
              <CopyKey text={step.code} />
            </div>
          </li>
        ))}
      </ol>
      <div className="close-actions">
        <Button size="lg" href={STORYBOOK} target="_blank" rel="noreferrer">
          Open Storybook ↗
        </Button>
        <Button size="lg" variant="outline" href={GITHUB} target="_blank" rel="noreferrer">
          GitHub ↗
        </Button>
      </div>
      <div className="colophon">
        <span>@anuj20/void-ui v{version}</span>
        <a href={NPM} target="_blank" rel="noreferrer">
          npm <Arrow />
        </a>
        <span>MIT</span>
        <a href={PORTFOLIO} target="_blank" rel="noreferrer">
          Made by Anuj Punekar <Arrow />
        </a>
      </div>
    </footer>
  );
}

export function App() {
  useReveal();

  return (
    <div className="page">
      <a className="skip" href="#install">
        Skip to install
      </a>
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Theming />
      </main>
      <Close />
    </div>
  );
}
