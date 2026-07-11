import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src/components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'password', 'email', 'search', 'number'] },
  },
  args: {
    label: 'Label',
    placeholder: 'Enter value...',
    type: 'text',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'This field is required' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Cannot edit' },
};

export const Password: Story = {
  args: { type: 'password', label: 'Password', placeholder: '••••••••' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '320px' }}>
      <Input label="Default" placeholder="Enter text..." />
      <Input label="With value" placeholder="Enter text..." defaultValue="anuj@example.com" />
      <Input label="Error state" placeholder="Enter text..." error="Invalid email address" />
      <Input label="Disabled" placeholder="Enter text..." disabled defaultValue="Not editable" />
    </div>
  ),
};
