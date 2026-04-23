## Step 1 Scope

- Only migrate the Login scene.
- Only touch shared code when Login depends on it directly.
- Do not start DB / Manage / Menu / Image Zoom scene migration.

## Current Login DOM Dependencies

### `src/auth/RnwAuthScreen.jsx`

- Direct DOM tags drive the full scene layout:
  - `<main>`
  - `<section>`
  - `<header>`
  - `<h1>`
  - `<form>`
  - `<label>`
  - `<input>`
  - `<p>`
  - `motion.button`
- Form submission depends on HTML form wiring:
  - `id="login-form"`
  - button `form="login-form"`
  - `type="submit"`
  - `event.preventDefault()`
- Username Enter handling depends on DOM keyboard event shape:
  - `event.key === 'Enter'`
  - direct `.focus()` on the password DOM input ref
- Login styling depends on DOM classes and CSS selectors:
  - `.app-shell--login`
  - `.phone-screen--login`
  - `.login-header`
  - `.login-title`
  - `.login-title__accent`
  - `.login-form`
  - `.input-shell`
  - `.input-shell--focused`
  - `.login-input`
  - `.app-version`
  - `.app-version--hidden`
  - `.login-button`
  - `.login-button--active`
- Placeholder styling depends on DOM pseudo selectors:
  - `.login-input::placeholder`
  - `.input-shell--focused .login-input::placeholder`
- Final Login path includes DOM-only accessibility flags:
  - `aria-hidden`

### `src/features/auth/useLoginViewport.js`

- Keyboard inset is written through the DOM:
  - `document.documentElement.style.setProperty('--keyboard-inset', ...)`
- The button movement depends on that global CSS custom property.

### `src/RnwApp.jsx`

- Top-level route staging uses a DOM wrapper:
  - `<div className="screen-stack">`
- Login route animation is delegated to `AnimatedScreenDom`.

### `src/components/layout/AnimatedScreen.jsx` via `src/dom/AnimatedScreenDom.jsx`

- Shared wrapper renders direct DOM:
  - `<div>`
- Hidden-screen behavior uses DOM-only accessibility handling:
  - `aria-hidden`
  - `inert`
- Animation lifecycle mutates host element DOM styles directly.

## RNW-Compatible Replacement Strategy

### Login scene rendering

- Replace Login scene markup with RNW primitives:
  - `View`
  - `Text`
  - `TextInput`
  - `Pressable`
- Preserve exact Korean copy and title line break with nested `Text` and `'\n'`.
- Preserve username/password controlled state wiring from `RnwApp`.
- Replace HTML form submit with explicit RNW handlers:
  - username submit -> focus password
  - password submit -> call existing submit callback when enabled
  - button press -> call existing submit callback when enabled

### Login styling

- Move Login-only styling to JS style objects scoped to the Login scene.
- Reproduce the current CSS values directly:
  - same shell size
  - same title spacing
  - same input shell height/padding/radius
  - same muted/accent colors
  - same version placement
  - same bottom button size and enabled/disabled colors
- Use `placeholderTextColor` for placeholder parity instead of CSS pseudo selectors.
- Use a pressed overlay inside `Pressable` to mimic the existing filled-button press feel.

### Keyboard inset behavior

- Keep the current `visualViewport` measurement approach.
- Stop writing a global CSS variable through `document.documentElement`.
- Return `keyboardInset` from `useLoginViewport`.
- Drive the Login button translateY from component state / RNW style instead of CSS variable injection.

### Login-to-main transition staging

- Replace only the top-level Login/app route staging in `src/RnwApp.jsx`.
- Keep the rest of the app scene stack untouched.
- Use RNW-compatible host primitives for the top-level route containers so Login no longer depends on `AnimatedScreenDom` in its final path.
- Preserve the current `loginToMain` and `logout` motion states from `src/motion.js` as closely as possible.

## Parity Risks

- RNW `TextInput` baseline and inner padding can differ slightly from raw DOM `<input>` defaults; explicit sizing resets will be needed.
- `Pressable` press timing may not match the previous pseudo-element active state perfectly without a dedicated overlay.
- Replacing form submission with explicit handlers can change edge-case Enter behavior if not wired carefully.
- Top-level screen transition timing may be near-exact rather than byte-for-byte identical if recreated with RNW animation primitives.
- Keyboard inset behavior still depends on `visualViewport`, so browser-specific viewport quirks can remain.

## Files To Change

- `src/auth/RnwAuthScreen.jsx`
- `src/features/auth/useLoginViewport.js`
- `src/RnwApp.jsx`
- `src/components/layout/AnimatedScreen.jsx` only if top-level Login staging cannot be isolated cleanly
- `src/styles.css` only if a minimal RNW-specific global reset is strictly required for Login inputs
- `src/auth/*` new Login-only style/helper file if needed
