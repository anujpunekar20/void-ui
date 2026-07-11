import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../src/components/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    'aria-label': { control: 'text' },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontFamily: 'var(--void-font-mono)', color: 'var(--void-text-muted)', fontSize: '14px' }}>
      <Spinner size="sm" />
      <span>Loading data...</span>
    </div>
  ),
};
