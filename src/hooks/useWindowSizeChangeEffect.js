import { useCallback, useLayoutEffect, useState } from 'react';

export default function useWindowSizeChangeEffect(func, deps) {
  const [callback, setCallback] = useState(() => {});
  const onResize = useCallback(() => {
    setCallback(func());
  });

  useLayoutEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (callback instanceof Function) callback.call();
    };
  }, [deps]);
}
