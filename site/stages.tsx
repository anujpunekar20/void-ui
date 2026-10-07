import type { ReactNode } from 'react';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Input,
  Option,
  Select,
  Spinner,
  Textarea,
  Toggle,
  Tooltip,
} from '../src';

// One stage = one live component instance. Each state is a set of real props;
// the stage swaps them on the same instance, so the component's own CSS
// transitions carry the change. Controlled fields write back through `set`,
// which is how a visitor's typing takes over from auto-play.
export type Live = Record<string, string | boolean | undefined>;

export interface StageState {
  name: string;
  props: Live;
}

export interface StageData {
  name: string;
  // Storybook docs slug: ?path=/docs/components-<slug>--docs
  slug: string;
  note: string;
  // Width of the specimen before the stage's zoom, for fields that fill their box.
  width?: string;
  states: StageState[];
  render: (s: Live, set: (patch: Live) => void) => ReactNode;
}

type Variant = 'solid' | 'outline' | 'ghost' | 'destructive';

const MENU = [
  { value: 'rename', label: 'Rename' },
  { value: 'duplicate', label: 'Duplicate' },
  { value: 'archive', label: 'Archive', disabled: true },
  { value: 'delete', label: 'Delete', destructive: true },
];

const str = (v: Live[string]) => (typeof v === 'string' ? v : undefined);

export const STAGES: StageData[] = [
  {
    name: 'Button',
    slug: 'button',
    note: 'Lifts on hover, sinks on press.',
    states: [
      { name: 'solid', props: { variant: 'solid', label: 'Deploy' } },
      { name: 'outline', props: { variant: 'outline', label: 'Preview' } },
      { name: 'ghost', props: { variant: 'ghost', label: 'Cancel' } },
      { name: 'destructive', props: { variant: 'destructive', label: 'Delete' } },
      { name: 'disabled', props: { variant: 'solid', label: 'Deploy', disabled: true } },
    ],
    render: (s) => (
      <Button variant={s.variant as Variant} disabled={!!s.disabled}>
        {s.label}
      </Button>
    ),
  },
  {
    name: 'Input',
    slug: 'input',
    note: 'Label, value, error, disabled.',
    width: '14rem',
    states: [
      { name: 'empty', props: { value: '' } },
      { name: 'filled', props: { value: 'anuj@void.dev' } },
      { name: 'error', props: { value: 'anuj@void', error: 'Add a domain, like .dev' } },
      { name: 'disabled', props: { value: 'locked@void.dev', disabled: true } },
    ],
    render: (s, set) => (
      <Input
        label="Email"
        placeholder="you@domain.dev"
        value={str(s.value)}
        error={str(s.error)}
        disabled={!!s.disabled}
        onChange={(e) => set({ value: e.target.value, error: undefined })}
      />
    ),
  },
  {
    name: 'Toggle',
    slug: 'toggle',
    note: 'On, off, error, disabled.',
    states: [
      { name: 'off', props: { checked: false } },
      { name: 'on', props: { checked: true } },
      { name: 'error', props: { checked: false, error: 'Requires a paid plan' } },
      { name: 'disabled', props: { checked: true, disabled: true } },
    ],
    render: (s, set) => (
      <Toggle
        label="Preview deploys"
        checked={!!s.checked}
        error={str(s.error)}
        disabled={!!s.disabled}
        onChange={(e) => set({ checked: e.target.checked, error: undefined })}
      />
    ),
  },
  {
    name: 'Checkbox',
    slug: 'checkbox',
    note: 'Checked, error, disabled.',
    states: [
      { name: 'unchecked', props: { checked: false } },
      { name: 'checked', props: { checked: true } },
      { name: 'error', props: { checked: false, error: 'Required to continue' } },
      { name: 'disabled', props: { checked: true, disabled: true } },
    ],
    render: (s, set) => (
      <Checkbox
        label="Accept the license"
        checked={!!s.checked}
        error={str(s.error)}
        disabled={!!s.disabled}
        onChange={(e) => set({ checked: e.target.checked, error: undefined })}
      />
    ),
  },
  {
    name: 'Select + Option',
    slug: 'select',
    note: 'Type to filter, arrows to pick.',
    width: '14rem',
    states: [
      { name: 'empty', props: {} },
      { name: 'selected', props: { value: 'Frankfurt' } },
      { name: 'error', props: { error: 'Pick a region' } },
      { name: 'disabled', props: { value: 'Mumbai', disabled: true } },
    ],
    // Select only reports a pick to uncontrolled state; the stage remounts the
    // specimen per state, so defaultValue is enough.
    render: (s) => (
      <Select
        label="Region"
        placeholder="Pick a region"
        defaultValue={str(s.value)}
        error={str(s.error)}
        disabled={!!s.disabled}
      >
        <Option value="bom1">Mumbai</Option>
        <Option value="fra1">Frankfurt</Option>
        <Option value="iad1">Washington</Option>
        <Option value="sfo1">San Francisco</Option>
      </Select>
    ),
  },
  {
    name: 'Textarea',
    slug: 'textarea',
    note: 'Input, over several lines.',
    width: '16rem',
    states: [
      { name: 'empty', props: { value: '' } },
      { name: 'filled', props: { value: 'Add enter/exit motion to floating components' } },
      { name: 'error', props: { value: '', error: "Can't be empty" } },
      { name: 'disabled', props: { value: 'Merged.', disabled: true } },
    ],
    render: (s, set) => (
      <Textarea
        label="Commit message"
        placeholder="What changed?"
        rows={3}
        value={str(s.value)}
        error={str(s.error)}
        disabled={!!s.disabled}
        onChange={(e) => set({ value: e.target.value, error: undefined })}
      />
    ),
  },
  {
    name: 'Badge',
    slug: 'badge',
    note: 'Four variants.',
    states: [
      { name: 'default', props: { variant: 'default', label: 'v0.3.0' } },
      { name: 'accent', props: { variant: 'accent', label: 'Live' } },
      { name: 'outline', props: { variant: 'outline', label: 'Beta' } },
      { name: 'destructive', props: { variant: 'destructive', label: 'Failed' } },
    ],
    render: (s) => (
      <Badge variant={s.variant as 'default' | 'accent' | 'outline' | 'destructive'}>
        {s.label}
      </Badge>
    ),
  },
  {
    name: 'Dropdown',
    slug: 'dropdown',
    note: 'Click to open. Keyboard ready.',
    states: [
      { name: 'outline', props: { variant: 'outline', label: 'Actions' } },
      { name: 'solid', props: { variant: 'solid', label: 'Branch' } },
      { name: 'ghost', props: { variant: 'ghost', label: 'More' } },
    ],
    render: (s) => (
      <Dropdown trigger={<Button variant={s.variant as Variant}>{s.label}</Button>} items={MENU} />
    ),
  },
  {
    name: 'Tooltip',
    slug: 'tooltip',
    note: 'Opens on hover and focus.',
    states: [
      { name: 'top', props: { placement: 'top' } },
      { name: 'right', props: { placement: 'right' } },
      { name: 'bottom', props: { placement: 'bottom' } },
    ],
    render: (s) => (
      <Tooltip
        key={str(s.placement)}
        trigger={<Button variant="outline">Hover me</Button>}
        label="Copies the build ID"
        placement={s.placement as 'top' | 'right' | 'bottom'}
      />
    ),
  },
  {
    name: 'Spinner',
    slug: 'spinner',
    note: 'Three sizes.',
    states: [
      { name: 'sm', props: { size: 'sm' } },
      { name: 'md', props: { size: 'md' } },
      { name: 'lg', props: { size: 'lg' } },
    ],
    render: (s) => <Spinner size={s.size as 'sm' | 'md' | 'lg'} />,
  },
  {
    name: 'Card',
    slug: 'card',
    note: 'A header and a body.',
    width: '15rem',
    states: [
      { name: 'header + body', props: { header: 'Production' } },
      { name: 'body only', props: {} },
      { name: 'with controls', props: { header: 'Notifications', controls: true } },
    ],
    render: (s) => (
      <Card header={str(s.header)}>
        {s.controls ? (
          <Toggle label="Email on failure" defaultChecked />
        ) : (
          'Last deploy 4m ago from main.'
        )}
      </Card>
    ),
  },
];
