# RNW Standalone Plan

## Current RNW architecture

The current RNW implementation lives in `rnw/` and contains:

- `index.html` as the Vite entry document.
- `vite.config.js` with the RNW Vite build config.
- `src/main.jsx` registering `RnwApp` through `react-native`/`react-native-web`.
- `src/RnwApp.jsx` for login-to-app routing and warm preload behavior.
- `src/app/RnwMainAppShell.jsx` for tab navigation, database/manage/menu shells, image zoom, and logout reset behavior.
- RNW-specific adapter wrappers under `src/adapters/`.
- RNW-specific DOM wrapper modules under `src/dom/`.
- Required local font files under `assets/fonts/`.

Most product behavior and UI still comes from the parent SDRS app under `../src/`. The RNW files are currently a thin shell around parent app modules.

## Why RNW is not standalone yet

The nested RNW folder cannot be cloned, installed, and run independently because:

- `rnw/package.json` is missing.
- `rnw/package-lock.json` is only an empty lockfile and has no dependency graph.
- RNW source imports parent modules through paths like `../../src/...` and `../../../src/...`.
- RNW CSS imports parent styles through `@import '../../src/styles/index.css'`.
- Parent CSS still contains remote font imports that are not needed when bundled local fonts are present.
- Default seed data is imported from parent root files: `../ship.csv` and `../images.zip`.
- Placeholder and UI assets are imported from parent root/source files: `../no-image.svg` and `../src/assets/ui/*`.
- The RNW build output is configured outside the RNW repo at `../dist-rnw`.

## External dependency categories

- Package metadata: parent `package.json` scripts and dependencies are currently required to run RNW.
- Domain logic: database state, ship normalization, search, CSV import/export, image ZIP import/export, bundled seed loading.
- Feature hooks: database filtering/search state, ship editor state, color mode, stack navigation, login viewport, reduced motion.
- UI components: database screen, manage screens, menu screens, bottom tab, animated screen, icons, image zoom modal.
- Adapters/services: IndexedDB persistence and file download helpers.
- Styles/tokens: parent global CSS, style import shim, and token CSS.
- Assets: logo SVGs, manage image, placeholder SVG, optional ship visual assets.
- Seed data: bundled `ship.csv` and `images.zip`.
- Vite assumptions: asset imports using parent-root relative paths and build output outside `rnw/`.

## Proposed standalone target structure

```text
rnw/
  package.json
  package-lock.json
  index.html
  vite.config.js
  ship.csv
  images.zip
  no-image.svg
  assets/
    fonts/
    ui/
  src/
    app/
    assets/
    auth/
    components/
    domain/
    features/
    hooks/
    services/
    styles/
    adapters/
    dom/
    motion.js
    search.js
    appDomain.js
    RnwApp.jsx
    main.jsx
    styles.css
```

The target keeps RNW entry/adapters where they are, copies reusable parent logic into `rnw/src/`, and updates imports to stay inside `rnw/`.

## Migration order

1. Document the current dependency map and validation plan.
2. Add RNW-local package metadata using the parent dependency versions needed by the RNW build.
3. Copy parent domain logic, hooks, feature UI, shared components, services, styles, assets, and seed files into `rnw/`.
4. Update RNW imports and copied module imports so no path points outside `rnw/`.
5. Update CSS imports to use RNW-local styles and local bundled fonts.
6. Update Vite config so build output is inside `rnw/dist`.
7. Run the standalone audit for parent path references.
8. Run `npm install`, `npm run dev`, and `npm run build` from `rnw/`.
9. Validate default seed loading, login, database/search/filter, manage/menu, and image zoom behavior against the current RNW parity target.
