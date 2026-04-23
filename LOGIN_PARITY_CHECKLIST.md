## Login Parity Checklist

- Title
  - Exact Korean text preserved
  - Exact line break preserved
  - Accent color preserved

- Spacing
  - Header top offset matches current layout
  - Form top offset matches current layout
  - Vertical rhythm between inputs matches current layout

- Input shells
  - Height remains `52px`
  - Horizontal padding remains `16px`
  - Radius remains `14px`
  - Focus background, shadow, and lift remain aligned with current behavior

- Placeholder styling
  - Placeholder copy unchanged
  - Unfocused placeholder color matches current feel
  - Focused placeholder color matches current feel

- Version text
  - Exact copy preserved
  - Same centered placement above button
  - Fade out on field focus remains

- Login button
  - Stays pinned to the bottom
  - Height remains `64px`
  - Disabled state matches current feel
  - Enabled state matches current feel
  - Press feedback remains close to current behavior

- Keyboard inset behavior
  - Bottom button lifts with viewport keyboard inset
  - Blur/focus timing remains close to current behavior

- Login submit behavior
  - Username Enter focuses password
  - Password submit triggers unchanged login callback when valid
  - Button press triggers unchanged login callback when valid

- Transition feel
  - Login to main route transition remains close to current `loginToMain`
  - Logout back to Login remains close to current `logout`
