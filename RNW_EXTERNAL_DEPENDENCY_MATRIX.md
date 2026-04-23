# RNW External Dependency Matrix

Audit root: `rnw/`.

External means any file currently loaded from outside `rnw/`.

## Package and project metadata

| Current dependency | Current path/reference | Used for | Action | Parity risk | Final target |
| --- | --- | --- | --- | --- | --- |
| Parent package manifest | Parent `../package.json`; RNW has no `package.json` | Scripts and dependency versions for Vite, React, RNW, JSZip, framer-motion, es-hangul | Copy relevant metadata into new RNW-local manifest | High if versions drift | `package.json` |
| Parent install graph | Parent `../package-lock.json`; RNW lockfile is empty | Reproducible install | Regenerate RNW lock with `npm install` | Medium | `package-lock.json` |
| Parent build output location | `vite.config.js` `build.outDir: '../dist-rnw'` | Production output | Replace with RNW-local `dist` | Low | `dist/` |

## RNW direct imports to parent source

| Current import path | Current importer | Used for | Action | Parity risk | Final target |
| --- | --- | --- | --- | --- | --- |
| `../../src/features/auth/useLoginViewport.js` | `src/RnwApp.jsx` | Mobile keyboard/viewport handling on login | Copy | High | `src/features/auth/useLoginViewport.js` |
| `../../src/hooks/useReducedMotionSafe.js` | `src/RnwApp.jsx` | Reduced-motion guard | Copy | Medium | `src/hooks/useReducedMotionSafe.js` |
| `../../src/motion.js` | `src/RnwApp.jsx` | Motion CSS variables and animation tokens | Copy | High | `src/motion.js` |
| `../../../src/features/database/useDatabaseFilters.js` | `src/app/RnwMainAppShell.jsx` | Database view/search/filter state | Copy | High | `src/features/database/useDatabaseFilters.js` |
| `../../../src/features/manage/useShipEditor.js` | `src/app/RnwMainAppShell.jsx` | Manage/import/export/edit behavior | Copy | High | `src/features/manage/useShipEditor.js` |
| `../../../src/hooks/useColorMode.js` | `src/app/RnwMainAppShell.jsx` | Theme mode | Copy | Medium | `src/hooks/useColorMode.js` |
| `../../../src/hooks/useStackNavigation.js` | `src/app/RnwMainAppShell.jsx` | Manage/menu nested navigation | Copy | High | `src/hooks/useStackNavigation.js` |
| `../../../src/app/appReducer.js` | `src/app/RnwMainAppShell.jsx` | App tab and zoom reducer | Copy | High | `src/app/appReducer.js` |
| `../../../src/domain/databaseState.js` | `src/app/useRnwAppBootstrap.js` | Empty/upgrade/display database state | Copy | High | `src/domain/databaseState.js` |
| `../../../src/domain/ships.js` | `src/app/useRnwAppBootstrap.js` | Image application and ship helpers | Copy | High | `src/domain/ships.js` |
| `../../../src/domain/importExport/bundledData.js` | `src/adapters/bundledSeed.web.js` | Default seed CSV/ZIP loading | Copy and retarget seed imports | High | `src/domain/importExport/bundledData.js` |
| `../../../src/services/fileDownload.js` | `src/adapters/export.web.js` | ZIP export download | Copy | Medium | `src/services/fileDownload.js` |
| `../../../src/services/indexedDbStore.js` | `src/adapters/storage.web.js` | Browser persistence | Copy | High | `src/services/indexedDbStore.js` |
| `../../../src/components/layout/AnimatedScreen.jsx` | `src/dom/AnimatedScreenDom.jsx` | Screen transitions | Copy | High | `src/components/layout/AnimatedScreen.jsx` |
| `../../../src/components/layout/BottomTab.jsx` | `src/dom/BottomTabDom.jsx` | Bottom tab UI | Copy | High | `src/components/layout/BottomTab.jsx` |
| `../../../src/features/database/DatabasePage.jsx` | `src/dom/DatabaseDom.jsx` | Database screen UI | Copy | High | `src/features/database/DatabasePage.jsx` |
| `../../../src/components/ImageZoomModal.jsx` | `src/dom/ImageZoomDom.jsx` | Image zoom modal | Copy | High | `src/components/ImageZoomModal.jsx` |
| `../../../src/features/manage/ManageHomePage.jsx` | `src/dom/ManageHomeDom.jsx` | Manage home UI | Copy | High | `src/features/manage/ManageHomePage.jsx` |
| `../../../src/features/manage/ManageShipEditPage.jsx` | `src/dom/ManageShipEditDom.jsx` | Manage edit UI | Copy | High | `src/features/manage/ManageShipEditPage.jsx` |
| `../../../src/features/menu/MenuPage.jsx` | `src/dom/MenuDom.jsx` | Menu UI | Copy | High | `src/features/menu/MenuPage.jsx` |
| `../../../src/features/menu/MenuInfoPage.jsx` | `src/dom/MenuInfoDom.jsx` | App info UI | Copy | High | `src/features/menu/MenuInfoPage.jsx` |
| `../../../src/features/menu/MenuModePage.jsx` | `src/dom/MenuModeDom.jsx` | Theme mode UI | Copy | Medium | `src/features/menu/MenuModePage.jsx` |
| `../../src/styles/index.css` | `src/styles.css` | Global UI styles and tokens | Copy and flatten imports | High | `src/styles/index.css`, `src/styles/base.css`, `src/styles/tokens.css` |

## Transitive parent source dependencies

| Current import path | Current parent importer | Used for | Action | Parity risk | Final target |
| --- | --- | --- | --- | --- | --- |
| `../../no-image.svg` | `../src/domain/databaseState.js` | Placeholder image in display vessels | Copy and retarget | High | `no-image.svg` |
| `../../no-image.svg` | `../src/domain/ships.js` | Placeholder image in ship records | Copy and retarget | High | `no-image.svg` |
| `../../../no-image.svg` | `../src/domain/importExport/shipCsv.js` | Placeholder on CSV import | Copy and retarget | High | `no-image.svg` |
| `./search.js` | `../src/domain/databaseState.js` | Search index creation | Copy | High | `src/domain/search.js` |
| `./ships.js` | `../src/domain/databaseState.js` | Vessel type derivation | Copy | High | `src/domain/ships.js` |
| `./shared.js` | `../src/domain/importExport/bundledData.js` | Import error helpers | Copy | Medium | `src/domain/importExport/shared.js` |
| `./imagesZip.js` | `../src/domain/importExport/bundledData.js` | Bundled image ZIP import | Copy | High | `src/domain/importExport/imagesZip.js` |
| `./shipCsv.js` | `../src/domain/importExport/bundledData.js` | Bundled ship CSV import | Copy | High | `src/domain/importExport/shipCsv.js` |
| `./csv.js` | `../src/domain/importExport/shipCsv.js` | CSV parse/serialize | Copy | High | `src/domain/importExport/csv.js` |
| `./sharedConstants.js` | `../src/domain/importExport/imagesZip.js` | Supported image matching | Copy | High | `src/domain/importExport/sharedConstants.js` |
| `./databaseExport.js` | `../src/features/manage/useShipEditor.js` dynamic import | DB export generation | Copy | High | `src/domain/importExport/databaseExport.js` |
| `../appDomain` | `../src/components/ManageScreens.jsx` | Manage card defaults | Copy | High | `src/appDomain.js` |
| `../search` | `../src/components/ManageScreens.jsx` | Manage screen filtering | Copy | High | `src/search.js` |
| `../motion` | Multiple parent UI modules | Motion tokens/helpers | Copy | High | `src/motion.js` |
| `../assets/assets.js` | Manage/menu/database modules | Static options/labels | Copy | Medium | `src/assets/assets.js` |
| `./Icons` / `./Icons.jsx` | Parent UI modules | Icon glyph wrapper | Copy | High | `src/components/Icons.jsx` |
| `./FilterSheet.jsx` | `../src/features/database/DatabasePage.jsx` | Filter screen | Copy | High | `src/features/database/FilterSheet.jsx` |
| `./DatabaseTopBars.jsx` | Database modules | Top/search bars | Copy | High | `src/features/database/DatabaseTopBars.jsx` |
| `./VesselResults.jsx` | Database modules | Vessel result cards | Copy | High | `src/features/database/VesselResults.jsx` |
| `./useVesselSearch.js` | Database modules | Search query application | Copy | High | `src/features/database/useVesselSearch.js` |
| `../../components/ManageScreens.jsx` | Manage page wrappers | Manage home/edit screen implementation | Copy | High | `src/components/ManageScreens.jsx` |
| `./MenuShared.jsx` | Menu info/mode pages | Menu subpage top bar | Copy | Medium | `src/features/menu/MenuShared.jsx` |

## Assets and data outside RNW

| Current import/path | Current importer | Used for | Action | Parity risk | Final target |
| --- | --- | --- | --- | --- | --- |
| `../../../ship.csv?url` | `../src/domain/importExport/bundledData.js` | Default bundled ship data | Copy and retarget | High | `ship.csv` |
| `../../../images.zip?url` | `../src/domain/importExport/bundledData.js` | Default bundled ship images | Copy and retarget | High | `images.zip` |
| `../../assets/ui/logo.svg` | `../src/features/database/DatabaseTopBars.jsx` | Database top-bar logo | Copy | Medium | `src/assets/ui/logo.svg` |
| `../assets/ui/manageImage.png` | `../src/components/ManageScreens.jsx` | Manage home visual | Copy | Medium | `src/assets/ui/manageImage.png` |
| `../../assets/ui/menuInfoLogo.svg` | `../src/features/menu/MenuInfoPage.jsx` | Info page logo | Copy | Medium | `src/assets/ui/menuInfoLogo.svg` |
| `../../assets/ui/menuInfoMark.svg` | `../src/features/menu/MenuInfoPage.jsx` | Info page mark | Copy | Medium | `src/assets/ui/menuInfoMark.svg` |
| `../src/assets/ui/shipCompact.png` | Parent asset directory | Fallback/parity asset | Copy for parity | Low | `src/assets/ui/shipCompact.png` |
| `../src/assets/ui/shipWideA.png` | Parent asset directory | Fallback/parity asset | Copy for parity | Low | `src/assets/ui/shipWideA.png` |
| `../src/assets/ui/shipWideB.png` | Parent asset directory | Fallback/parity asset | Copy for parity | Low | `src/assets/ui/shipWideB.png` |

## RNW-local dependencies already present

| RNW-local path | Used for | Action |
| --- | --- | --- |
| `assets/fonts/PretendardGOV-Regular.otf` | Local app font, weight 400 | Keep |
| `assets/fonts/PretendardGOV-Medium.otf` | Local app font, weight 500 | Keep |
| `assets/fonts/PretendardGOV-SemiBold.otf` | Local app font, weight 600 | Keep |
| `assets/fonts/PretendardGOV-Bold.otf` | Local app font, weight 700 | Keep |
| `assets/fonts/MaterialSymbolsRounded.ttf` | Local symbol font | Keep |
| `assets/fonts/MaterialIconsRound-Regular.otf` | Local icon font fallback | Keep |

## External packages required by the standalone app

| Package | Used for | Source version |
| --- | --- | --- |
| `@vitejs/plugin-react` | Vite React plugin | Parent `package.json` |
| `vite` | Dev server/build | Parent `package.json` |
| `react` | Runtime | Parent `package.json` |
| `react-dom` | Runtime DOM renderer | Parent `package.json` |
| `react-native` | AppRegistry entry | Parent `package.json` |
| `react-native-web` | RNW alias target | Parent `package.json` |
| `framer-motion` | UI animation | Parent `package.json` |
| `jszip` | Image import/export ZIP handling | Parent `package.json` |
| `es-hangul` | Korean search matching | Parent `package.json` |
| `vitest` | Optional local tests | Parent `package.json` |

