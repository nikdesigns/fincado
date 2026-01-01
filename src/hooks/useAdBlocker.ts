import { useEffect, useState } from 'react';

export const useAdBlocker = (): boolean => {
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const checkAds = () => {
      const ads = document.querySelectorAll('.adsbygoogle');

      if (!ads.length) {
        setDetected(false);
        return;
      }

      const ad = ads[0] as HTMLElement;

      // If ad container is empty or collapsed → adblock detected
      if (
        ad.offsetHeight === 0 ||
        ad.clientHeight === 0 ||
        ad.innerHTML.trim() === ''
      ) {
        setDetected(true);
      }
    };

    // Give AdSense time to inject iframe
    const timeout = window.setTimeout(checkAds, 1800);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return detected;
};
