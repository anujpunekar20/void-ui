import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'accent', 'outline', 'destructive'] },
    children: { control: 'text' },
  },
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: 'default' } };
export const Accent: Story = { args: { variant: 'accent' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Destructive: Story = { args: { variant: 'destructive' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Active</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Error</Badge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <span style={{ fontFamily: 'var(--void-font-mono)', color: 'var(--void-text-primary)', fontSize: '14px' }}>
        Dashboard
      </span>
      <Badge variant="accent">New</Badge>
      <span style={{ fontFamily: 'var(--void-font-mono)', color: 'var(--void-text-primary)', fontSize: '14px' }}>
        Alerts
      </span>
      <Badge variant="destructive">3</Badge>
    </div>
  ),
};
