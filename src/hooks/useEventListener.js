import { useEffect, useRef, useCallback } from 'react';

const useEventListener = (eventName, handler = () => {}, target = window) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!target || !target.addEventListener) return;

    const eventHandler = (event) => handlerRef.current(event);
    target.addEventListener(eventName, eventHandler);

    return () => {
      target.removeEventListener(eventName, eventHandler);
    };
  }, [eventName, target]);
};

export default useEventListener;
