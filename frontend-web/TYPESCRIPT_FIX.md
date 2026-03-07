# TypeScript Module Resolution Fix

If you're seeing errors about `react-leaflet` or `leaflet` not being found, try these steps:

## Solution 1: Restart TypeScript Server (Recommended)

**In VS Code/Cursor:**
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "TypeScript: Restart TS Server"
3. Press Enter

**Or:**
- Close and reopen your IDE/editor
- The TypeScript server will restart automatically

## Solution 2: Clear Cache and Reinstall

```bash
cd frontend-web
rm -rf node_modules/.cache
rm -rf .eslintcache
npm install
```

## Solution 3: Verify Installation

The packages are correctly installed:
- ✅ `leaflet@1.9.4`
- ✅ `react-leaflet@4.2.1`
- ✅ `@types/leaflet@1.9.21`

The build compiles successfully - this is just an IDE cache issue.

## Current Status

✅ **Build compiles successfully** - verified with `npm run build`
✅ **File is correct** - uses `import * as L from 'leaflet'` (correct syntax)
✅ **Packages installed** - all dependencies are in `node_modules`

The error you're seeing is from the TypeScript language server cache, not an actual compilation error.

