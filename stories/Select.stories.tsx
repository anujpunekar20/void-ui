import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../src/components/Select';
import { Option } from '../src/components/Option';

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
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
  },
  args: {
    label: 'Framework',
    placeholder: 'Select a framework...',
    options: FRAMEWORKS,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'Please select a framework' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const NoPlaceholder: Story = {
  args: { placeholder: undefined },
};

export const WithCustomOptions: Story = {
  args: { options: undefined },
  render: (args) => (
    <Select {...args}>
      <Option value="react">React</Option>
      <Option value="vue">Vue</Option>
      <Option value="svelte">Svelte</Option>
      <Option value="solid">Solid</Option>
    </Select>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '360px' }}>
      <Select label="Default" placeholder="Select..." options={FRAMEWORKS} />
      <Select label="Error state" placeholder="Select..." options={FRAMEWORKS} error="This field is required" />
      <Select label="Disabled" options={FRAMEWORKS} disabled />
    </div>
  ),
};
