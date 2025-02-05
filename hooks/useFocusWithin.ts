import { type FocusEvent, useCallback, useRef } from 'react';

export interface FocusWithinOpts {
  readonly onFocus?: (event: FocusEvent) => void;
  readonly onBlur?: (event: FocusEvent) => void;
}

export interface FocusWithinProps {
  readonly onFocus: (event: FocusEvent) => void;
  readonly onBlur: (event: FocusEvent) => void;
}

export function useFocusWithin({ onFocus, onBlur } : FocusWithinOpts): FocusWithinProps {
  const isFocusWithin = useRef(false);

  return {
    onFocus: useCallback((event: FocusEvent) => {
      if (!isFocusWithin.current && document.activeElement === event.target) {
        isFocusWithin.current = true;

        if (onFocus) {
          onFocus(event);
        }
      }
    }, [onFocus]),
    onBlur: useCallback((event: FocusEvent) => {
      if (isFocusWithin.current && !event.currentTarget.contains(event.relatedTarget)) {
        isFocusWithin.current = false;
        
        if (onBlur) {
          onBlur(event);
        }
      }
    }, [onBlur]),
  };
}