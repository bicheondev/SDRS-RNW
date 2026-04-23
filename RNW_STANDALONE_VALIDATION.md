# RNW Standalone Validation

## Clean install

Run from `rnw/`:

```sh
npm install
```

Expected result:

- `package-lock.json` contains a real dependency graph.
- Install does not require parent `../package.json`.
- No dependency is installed from a parent file path.

## Dev server

Run from `rnw/`:

```sh
npm run dev
```

Expected result:

- Vite starts using RNW-local `package.json` and `vite.config.js`.
- The app loads at the reported local URL.
- No module resolution error references `../src`, parent seed files, or parent assets.

## Production build

Run from `rnw/`:

```sh
npm run build
```

Expected result:

- Build succeeds.
- Output is created under RNW-local `dist/`.
- Bundled asset manifest includes RNW-local `ship.csv`, `images.zip`, fonts, SVGs, and PNGs.

## Dependency audit

Run from `rnw/`:

```sh
rg -n "\\.\\./\\.\\.|\\.\\./src|\\.\\./ship\\.csv|\\.\\./images\\.zip|\\.\\./no-image\\.svg|dist-rnw|../../src|../../../src" .
```

Expected result:

- No runtime source, CSS, config, or package file depends on parent SDRS paths.
- Documentation may mention old paths for audit history only.

## Functional parity checks

Manual checks against the current RNW parity target:

- Login screen renders with the same Korean copy and enabled/disabled login button behavior.
- Login submission transitions into the main app.
- Bundled `ship.csv` and `images.zip` load by default on first run.
- Database home displays seeded vessels and images.
- Search query filtering works, including Korean/choseong behavior.
- Harbor and vessel-type filters work.
- Compact/list database display toggle works.
- Manage home opens, ship CSV import flow still prompts for keep/replace behavior, image ZIP import works, export downloads `db_export.zip`.
- Manage ship edit supports add, delete, reorder, image change, save, discard modal, and toast.
- Menu opens, color mode selection works, info page uses the expected logo/mark, and logout returns to login.
- Image zoom opens from vessel images, supports navigation/close behavior, and returns cleanly.

## Final standalone confirmation

After validation:

- `find . -path "./node_modules" -prune -o -type f -print` should show all required runtime files inside RNW.
- Moving or hiding the parent SDRS repo should not break `npm install`, `npm run dev`, or `npm run build` from RNW.
