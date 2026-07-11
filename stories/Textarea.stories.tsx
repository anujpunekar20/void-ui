import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../src/components/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    rows: { control: 'number' },
  },
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'Message is required' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Cannot edit this' },
};

export const WithRows: Story = {
  args: { rows: 6, label: 'Bio' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '360px' }}>
      <Textarea label="Default" placeholder="Enter text..." />
      <Textarea label="With value" defaultValue="Some text content here that spans the field." />
      <Textarea label="Error state" placeholder="Enter text..." error="This field is required" />
      <Textarea label="Disabled" disabled defaultValue="Not editable" />
    </div>
  ),
};
