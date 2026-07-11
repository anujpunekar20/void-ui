import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '../src/components/Dropdown';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '80px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS = [
  { value: 'edit', label: 'Edit', onSelect: () => alert('Edit') },
  { value: 'duplicate', label: 'Duplicate', onSelect: () => alert('Duplicate') },
  { value: 'archive', label: 'Archive', disabled: true },
  { value: 'delete', label: 'Delete', destructive: true, onSelect: () => alert('Delete') },
];

export const Default: Story = {
  render: () => <Dropdown trigger={<Button variant="outline">Actions</Button>} items={ITEMS} />,
};

export const CustomTrigger: Story = {
  render: () => (
    <Dropdown
      trigger={
        <span
          tabIndex={0}
          role="button"
          aria-label="More options"
          style={{
            display: 'inline-flex',
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--void-border)',
            fontFamily: 'var(--void-font-mono)',
            cursor: 'pointer',
          }}
        >
          ⋮
        </span>
      }
      items={ITEMS}
    />
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
      <Dropdown placement="top-start" trigger={<Button variant="outline">top-start</Button>} items={ITEMS} />
      <Dropdown placement="top" trigger={<Button variant="outline">top</Button>} items={ITEMS} />
      <Dropdown placement="top-end" trigger={<Button variant="outline">top-end</Button>} items={ITEMS} />
      <Dropdown placement="bottom-start" trigger={<Button variant="outline">bottom-start</Button>} items={ITEMS} />
      <Dropdown placement="bottom" trigger={<Button variant="outline">bottom</Button>} items={ITEMS} />
      <Dropdown placement="bottom-end" trigger={<Button variant="outline">bottom-end</Button>} items={ITEMS} />
      <Dropdown placement="left-start" trigger={<Button variant="outline">left-start</Button>} items={ITEMS} />
      <Dropdown placement="right-start" trigger={<Button variant="outline">right-start</Button>} items={ITEMS} />
    </div>
  ),
};
