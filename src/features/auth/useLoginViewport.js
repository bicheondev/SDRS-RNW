import { useCallback, useEffect, useRef, useState } from 'react';

export function useLoginViewport({ enabled }) {
  const [focusedField, setFocusedField] = useState('');
  const [keyboardInset, setKeyboardInset] = useState(0);
  const blurTimeoutRef = useRef(null);
  const lastInsetRef = useRef(0);

  useEffect(
    () => () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!enabled) {
      setFocusedField('');
      setKeyboardInset(0);
      lastInsetRef.current = 0;
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return undefined;
    }

    const viewport = window.visualViewport;
    if (!viewport) {
      return undefined;
    }

    let baseline = window.innerHeight;
    let rafId = null;
    let pending = 0;

    const apply = () => {
      rafId = null;
      setKeyboardInset((currentInset) => {
        if (currentInset === pending) {
          return currentInset;
        }

        return pending;
      });

      if (pending > 0) {
        lastInsetRef.current = pending;
      }
    };

    const update = () => {
      if (window.innerHeight > baseline) {
        baseline = window.innerHeight;
      }

      const inset = Math.max(0, baseline - viewport.height - viewport.offsetTop);

      if (inset === pending && rafId !== null) {
        return;
      }

      pending = inset;

      if (rafId === null) {
        rafId = window.requestAnimationFrame(apply);
      }
    };

    update();
    viewport.addEventListener('resize', update);
    viewport.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);

    return () => {
      viewport.removeEventListener('resize', update);
      viewport.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      setKeyboardInset(0);
    };
  }, [enabled]);

  const handleFieldFocus = useCallback((field) => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }

    setFocusedField(field);

    if (lastInsetRef.current > 0) {
      setKeyboardInset(lastInsetRef.current);
    }
  }, []);

  const handleFieldBlur = useCallback(() => {
    blurTimeoutRef.current = window.setTimeout(() => {
      setFocusedField('');
      setKeyboardInset(0);
      blurTimeoutRef.current = null;
    }, 80);
  }, []);

  return {
    focusedField,
    handleFieldBlur,
    handleFieldFocus,
    keyboardInset,
  };
}
