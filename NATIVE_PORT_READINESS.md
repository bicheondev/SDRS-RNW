# Native Port Readiness

## Summary

SDRS-RNW no longer uses the old `src/dom` wrapper screen layer. The active app imports RNW feature/component modules directly from `src/features` and `src/components`, and the empty `src/dom` directory has been removed.

The current target is still Vite + React Native Web. Browser-only behavior that must remain for the web build is now routed through explicit platform boundary files under `src/platform/`.

## Removed DOM Wrapper Layer

These wrapper files are no longer present or imported:

- `src/dom/AnimatedScreenDom.jsx`
- `src/dom/BottomTabDom.jsx`
- `src/dom/DatabaseDom.jsx`
- `src/dom/ImageZoomDom.jsx`
- `src/dom/ManageHomeDom.jsx`
- `src/dom/ManageShipEditDom.jsx`
- `src/dom/MenuDom.jsx`
- `src/dom/MenuInfoDom.jsx`
- `src/dom/MenuModeDom.jsx`

Validation command:

```sh
npm run check:dom
```

## Platform Boundary Files

- `src/platform/index.js` exports lightweight browser/runtime helpers used by UI code.
- `src/platform/files.js` exports web file picking, download, and image-file reading.
- `src/platform/storage.js` exports IndexedDB-backed persistence.
- `src/platform/bundledData.js` exports Vite/web bundled seed file loading for `ship.csv` and `images.zip`.
- `src/platform/web/browser.js` contains `window`, `document`, `matchMedia`, `visualViewport`, DOM rect, and event-listener helpers.
- `src/platform/web/files.js` contains web-only file input, object URL download, and `FileReader`.
- `src/platform/web/storage.js` contains IndexedDB access.
- `src/platform/web/bundledData.js` contains Vite asset URL, `fetch`, and `File` creation for default bundled data.

## Browser APIs Still Required For Web

- `document.getElementById` is isolated by `getRootElement()` for the Vite RNW mount.
- `window.requestIdleCallback`, timers, and `matchMedia` are isolated by browser runtime helpers.
- `visualViewport` remains necessary to preserve mobile login keyboard-lift behavior.
- DOM rect reads remain necessary for current web image zoom origin/target transitions and DB edit scroll/reorder behavior.
- `input type="file"`, `FileReader`, object URLs, and download anchors remain necessary for web import/export.
- IndexedDB remains the current web persistence layer.
- Vite asset URL loading for `ship.csv`, `images.zip`, and `no-image.svg` remains required for default initial data parity.

## Bundled Data

The default seed behavior is preserved:

- `ship.csv`
- `images.zip`
- `no-image.svg`

Validation command:

```sh
npm run check:bundled-data
```

## Repo Hygiene

- `node_modules/` and `dist/` are now ignored and removed from Git tracking.
- Root `tmp_*` Playwright helpers were moved to `tools/` with clearer names.
- `.gitignore` now excludes generated folders, logs, local Vite cache, env files, and future temporary files.

## Validation

Run:

```sh
npm run check:native-readiness
npm run test:run
npm run build
```

## Remaining Native APK Work

- Add real `src/platform/native/*` implementations for storage, bundled seed loading, file import/export, and image picking.
- Replace Vite asset URL usage with Expo asset handling for native.
- Decide whether IndexedDB state should map to AsyncStorage, SQLite, or filesystem-backed storage.
- Replace browser DOM rect measurement and thumbnail query logic in image zoom/reorder with native ref measurement and gesture primitives.
- Replace browser download anchors with native sharing/filesystem export.
- Add device-level native gesture validation once Expo is introduced.

## Parity Risk

No visual redesign was made for this migration. The highest-risk parity areas remain live gesture behavior that cannot be proven by pure unit tests:

- Image zoom open/close origin measurement
- Pinch/pan/dismiss gestures
- Long-press DB card reordering and autoscroll
