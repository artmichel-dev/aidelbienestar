import { useState, useEffect } from 'react';

export const useOperaDetection = () => {
  const [isOpera, setIsOpera] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      // @ts-expect-error Opera is not typed in TS
      const isOperaObject = typeof window.opera !== 'undefined';
      const isOperaBrowser =
        userAgent.includes('OPR/') || // Opera Desktop
        userAgent.includes('Opera/') || // Opera Mobile
        (userAgent.includes('Opera') && !userAgent.includes('Chrome')) || // Opera legacy
        isOperaObject ||
        userAgent.includes('OPiOS') || // Opera iOS
        userAgent.includes('OPAndroid'); // Opera Android
      setIsOpera(!!isOperaBrowser);
    }
  }, []);

  return { isOpera, isClient };
}; 