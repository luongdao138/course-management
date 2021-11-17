import { useEffect, useRef } from 'react';

const useClickOutSide = (ref, handler) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const mouseHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handlerRef.current(e);
      }
    };

    window.addEventListener('mousedown', mouseHandler);
    window.addEventListener('touchstart', mouseHandler);

    return () => {
      window.removeEventListener('mousedown', mouseHandler);
      window.removeEventListener('touchstart', mouseHandler);
    };
  }, [ref]);
};

export default useClickOutSide;
