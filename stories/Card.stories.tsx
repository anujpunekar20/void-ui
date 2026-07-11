import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../src/components/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    header: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    header: 'Card Header',
    children: 'Card body content goes here.',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutHeader: Story = {
  args: { header: undefined, children: 'A card with no header — just body content.' },
};

export const WithComplexContent: Story = {
  render: () => (
    <Card header="System Status">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--void-font-mono)', fontSize: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--void-text-muted)' }}>API</span>
          <span style={{ color: 'var(--void-accent)' }}>Operational</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--void-text-muted)' }}>Database</span>
          <span style={{ color: 'var(--void-accent)' }}>Operational</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--void-text-muted)' }}>CDN</span>
          <span style={{ color: 'var(--void-destructive)' }}>Degraded</span>
        </div>
      </div>
    </Card>
  ),
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '720px' }}>
      <Card header="Requests">1,204,302</Card>
      <Card header="Errors">42</Card>
      <Card header="Latency">84ms</Card>
      <Card header="Uptime">99.98%</Card>
    </div>
  ),
};
