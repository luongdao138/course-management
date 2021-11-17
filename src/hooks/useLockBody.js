import { useLayoutEffect } from 'react';

const useLockBody = () => {
  useLayoutEffect(() => {
    const bodyEl = document.querySelector('body');
    const originalOverFlowStyle = bodyEl.style.overflow;

    bodyEl.style.overflow = 'hidden';

    return () => {
      bodyEl.style.overflow = originalOverFlowStyle;
    };
  }, []);
};

export default useLockBody;
