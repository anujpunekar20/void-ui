# void-ui

A dark-first React component library with a sharp, brutalist look — no rounded corners, no shadows, one accent color.

## Install

```bash
npm install @anuj20/void-ui react react-dom
```

`react` and `react-dom` (`>=18`) are peer dependencies, not bundled.

## Usage

```tsx
import { Button } from '@anuj20/void-ui';
import '@anuj20/void-ui/styles'; // once, anywhere in your app's entry point

function App() {
  return <Button variant="solid">Click me</Button>;
}
```

All colors, spacing, radii, and animation durations are exposed as CSS custom properties (`--void-*`) on `:root`. Override any of them in your own CSS to theme the library — no rebuild required.

## Components

`Button` · `Badge` · `Input` · `Textarea` · `Card` · `Spinner` · `Select` · `Option` · `Checkbox` · `Toggle` · `Dropdown` · `Tooltip`

Full prop docs and live examples: [Storybook](https://anujpunekar20.github.io/void-ui/)

## License

MIT
