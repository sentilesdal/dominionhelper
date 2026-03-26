# Build

Build the Chrome extension to `dist/`.

## Commands

```bash
npm run build    # Typecheck + build
npm run dev      # Build without typecheck (faster iteration)
```

## Loading the Extension

1. Open `chrome://extensions/`
2. Enable Developer mode
3. Click "Load unpacked" and select the `dist/` directory
4. After rebuilding, click the reload button on the extension card
