import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../src/components/Tooltip';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
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

export const Default: Story = {
  render: () => <Tooltip trigger={<Button variant="outline">Hover me</Button>} label="A short helpful hint" />,
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
      <Tooltip placement="top" trigger={<Button variant="outline">top</Button>} label="Top tooltip" />
      <Tooltip placement="bottom" trigger={<Button variant="outline">bottom</Button>} label="Bottom tooltip" />
      <Tooltip placement="left" trigger={<Button variant="outline">left</Button>} label="Left tooltip" />
      <Tooltip placement="right" trigger={<Button variant="outline">right</Button>} label="Right tooltip" />
    </div>
  ),
};
