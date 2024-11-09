# Instructions for Creating Figma to React Component Converter

## Project Setup

1. Create a new project:
```bash
mkdir figma-to-react
cd figma-to-react
npm init -y
```

2. Install dependencies:
```bash
npm install axios dotenv react react-dom
npm install -D typescript @types/node @types/react @types/react-dom ts-node ts-node-dev @vitejs/plugin-react vite
```

3. Create project structure:
```
src/
  components/
    icons/
      index.tsx        # SVG icons
  figma/
    figma.utils.ts     # Figma API utilities
    mapData.ts         # Data mapping utilities
  types/
    css.d.ts          # CSS module types
    index.ts          # Common types
  App.tsx             # Main component
  App.css             # Global styles
  index.tsx           # React entry point
main.ts               # Generation script
```

## Configuration Setup

1. Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

2. Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

3. Create `.env`:
```plaintext
FIRMA_API_KEY=your_figma_api_key
FIGMA_FILE_ID=your_figma_file_id
```

## Component Implementation

1. Create icon components (`src/components/icons/index.tsx`):
```typescript
export const Logo = () => (
  // SVG logo code
);

export const SearchIcon = () => (
  // SVG search icon code
);

export const ThemeIcon = () => (
  // SVG theme icon code
);
```

2. Create Figma utilities (`src/figma/figma.utils.ts`):
```typescript
export async function fetchFigmaData(fileId: string): Promise<FigmaResponse> {
  // Code for fetching data from Figma API
}

export function figmaToCss(node: any) {
  // Code for converting Figma styles to CSS
}
```

3. Create component generator (`src/utils.ts`):
```typescript
export function generateReactComponent(component: OriginalFormat): string {
  // Code for generating React component
}

export function generateStyleModule(component: OriginalFormat): string {
  // Code for generating CSS module
}
```

## Running and Testing

1. Run component generation:
```bash
npm start
```

2. Start React application:
```bash
npm run dev:react
```

3. Verify results:
- Compare with Figma design
- Check all styles and spacing
- Test search and icons functionality
- Verify responsiveness

## Implementation Details

1. Header:
- Height: 64px
- Dark background (#0A0A0A)
- Max content width: 1440px
- Side padding: 48px

2. Search field:
- Width: 240px
- Height: 40px
- Border radius: 8px
- Transparent background
- White border with 0.2 opacity

3. Navigation:
- Font: Inter
- Font size: 16px
- Font weight: 500
- Item spacing: 32px

4. Social links:
- Font size: 14px
- Opacity: 0.8
- Link spacing: 16px

## Troubleshooting

1. If components don't generate:
- Check Figma API token
- Verify Figma file ID
- Check file access permissions

2. If styles display incorrectly:
- Check figmaToCss function
- Verify CSS module generation
- Check font imports

3. If icons don't display:
- Verify SVG code
- Check viewBox dimensions
- Verify colors and stroke-width
