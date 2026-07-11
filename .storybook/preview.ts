import '../src/styles/index.css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'elevated', value: '#111111' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
