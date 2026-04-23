# RNW Internalization Plan

## Domain logic

Copy parent domain modules into RNW with the same module boundaries:

- `src/domain/databaseState.js`
- `src/domain/ships.js`
- `src/domain/search.js`
- `src/domain/importExport/bundledData.js`
- `src/domain/importExport/csv.js`
- `src/domain/importExport/databaseExport.js`
- `src/domain/importExport/imagesZip.js`
- `src/domain/importExport/shared.js`
- `src/domain/importExport/sharedConstants.js`
- `src/domain/importExport/shipCsv.js`
- `src/domain/importExport/index.js`

Then retarget all parent-root asset/data imports:

- `../../no-image.svg` to `../../no-image.svg` from copied domain modules where that relative path still resolves inside RNW.
- `../../../ship.csv?url` and `../../../images.zip?url` to RNW-local root seed files.

## Shared hooks

Copy the hooks currently used by RNW:

- `src/hooks/useColorMode.js`
- `src/hooks/useReducedMotionSafe.js`
- `src/hooks/useStackNavigation.js`
- `src/hooks/useRouteNavigation.js` for completeness with the copied hook set.
- `src/features/auth/useLoginViewport.js`

Do not rewrite behavior unless a path must change.

## Shared assets

Copy all parent assets needed for current parity:

- `no-image.svg` to RNW root.
- `ship.csv` to RNW root.
- `images.zip` to RNW root.
- `src/assets/assets.js`.
- `src/assets/ui/logo.svg`.
- `src/assets/ui/manageImage.png`.
- `src/assets/ui/menuInfoLogo.svg`.
- `src/assets/ui/menuInfoMark.svg`.
- `src/assets/ui/shipCompact.png`.
- `src/assets/ui/shipWideA.png`.
- `src/assets/ui/shipWideB.png`.

Keep existing RNW-local fonts in `assets/fonts/`.

## CSS and tokens

Create RNW-local style modules:

- `src/styles/base.css` copied from parent `src/styles.css`, excluding remote font `@import` lines.
- `src/styles/tokens.css` copied from parent `src/styles/tokens.css`.
- `src/styles/index.css` importing RNW-local `base.css` and `tokens.css`.

Update `src/styles.css` to import `./styles/index.css` instead of `../../src/styles/index.css`, keeping local `@font-face` declarations for bundled fonts.

## Fonts

Keep the existing bundled fonts:

- Pretendard GOV weights 400, 500, 600, 700.
- Material Symbols Rounded.
- Material Icons Round.

Remove reliance on parent CSS remote font imports by using the local font-face declarations already in RNW.

## Default seed data

Copy `ship.csv` and `images.zip` to RNW root. Keep the existing bundled loader behavior:

1. Import seed files as Vite `?url` assets.
2. Fetch them at runtime.
3. Convert fetched blobs to `File` instances.
4. Import images first, then import ship rows and apply images by registration.
5. Persist loaded state to IndexedDB only after bootstrap is ready.

## Adapters

Keep RNW adapter seams but retarget them to local modules:

- `src/adapters/bundledSeed.web.js` re-exports from `../domain/importExport/bundledData.js`.
- `src/adapters/export.web.js` re-exports from `../services/fileDownload.js`.
- `src/adapters/storage.web.js` re-exports from `../services/indexedDbStore.js`.

## Navigation, reducer, and bootstrap seams

Copy and retarget:

- `src/app/appReducer.js`.
- `src/motion.js`.
- `src/search.js`.
- `src/appDomain.js`.
- `src/app/useRnwAppBootstrap.js` imports.
- `src/app/RnwMainAppShell.jsx` imports.
- `src/RnwApp.jsx` imports.

Keep the RNW lazy-loading and preload boundaries intact so runtime behavior stays close to the current parity target.

