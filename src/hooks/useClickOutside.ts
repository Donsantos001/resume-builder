import { useEffect } from 'react';

const options = {
  passive: true,
};

/**
 * You can usecallback for @param onOutsideClick if theres too much rerender
 */

const useClickOutside = (
  node: React.MutableRefObject<any>,
  onOutsideClick: (event: MouseEvent | TouchEvent) => void,
  disabled?: boolean
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!node.current || node.current.contains(event.target)) {
        return;
      }
      onOutsideClick(event);
    };

    if (!disabled) {
      document.addEventListener('mousedown', listener, options);
    } else {
      document.removeEventListener('mousedown', listener);
    }

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [node, onOutsideClick, disabled]);
};

export default useClickOutside;
