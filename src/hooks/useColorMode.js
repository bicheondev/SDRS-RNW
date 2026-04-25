import { Appearance } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

const COLOR_MODE_STORAGE_KEY = 'sdrs:color-mode';
const VALID_COLOR_MODES = new Set(['system', 'light', 'dark']);

function normalizeColorMode(colorMode, fallback = 'light') {
  return VALID_COLOR_MODES.has(colorMode) ? colorMode : fallback;
}

function getSystemColorMode() {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return Appearance.getColorScheme?.() === 'dark' ? 'dark' : 'light';
}

function getStoredColorMode(initialMode) {
  if (typeof window === 'undefined') {
    return normalizeColorMode(initialMode);
  }

  try {
    return normalizeColorMode(window.localStorage?.getItem(COLOR_MODE_STORAGE_KEY), initialMode);
  } catch {
    return normalizeColorMode(initialMode);
  }
}

export function useColorMode(initialMode = 'light') {
  const [colorMode, setColorModeState] = useState(() => getStoredColorMode(initialMode));
  const [systemColorMode, setSystemColorMode] = useState(getSystemColorMode);

  const resolvedColorMode = colorMode === 'system' ? systemColorMode : colorMode;

  useEffect(() => {
    const updateSystemColorMode = (colorScheme) => {
      if (colorScheme !== 'dark' && colorScheme !== 'light') {
        setSystemColorMode(getSystemColorMode());
        return;
      }

      setSystemColorMode(colorScheme === 'dark' ? 'dark' : 'light');
    };

    let cleanupMatchMedia = null;

    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleMediaChange = (event) => {
        updateSystemColorMode(event.matches ? 'dark' : 'light');
      };

      updateSystemColorMode(mediaQuery.matches ? 'dark' : 'light');

      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleMediaChange);
        cleanupMatchMedia = () => mediaQuery.removeEventListener('change', handleMediaChange);
      } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(handleMediaChange);
        cleanupMatchMedia = () => mediaQuery.removeListener(handleMediaChange);
      }
    } else {
      setSystemColorMode(getSystemColorMode());
    }

    const subscription = Appearance.addChangeListener?.(({ colorScheme }) => {
      updateSystemColorMode(colorScheme);
    });

    return () => {
      cleanupMatchMedia?.();
      subscription?.remove?.();
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage?.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
    } catch {
      // Ignore storage failures; the in-memory selection still applies.
    }
  }, [colorMode]);

  const setColorMode = useCallback((nextColorMode) => {
    setColorModeState(normalizeColorMode(nextColorMode));
  }, []);

  return {
    colorMode,
    resolvedColorMode,
    setColorMode,
    systemColorMode,
  };
}
