import { useState, useEffect } from 'react';

export const useAdBlocker = () => {
  const [isAdBlockDetected, setIsAdBlockDetected] = useState(false);

  useEffect(() => {
    const detectAdBlocker = async () => {
      let adBlockDetected = false;

      // -----------------------------------------
      // TRAP 1: The "Honey Pot" Element (CSS Check)
      // -----------------------------------------
      const bait = document.createElement('div');
      // These classes are on the "EasyList" blocklist used by uBlock/AdBlock
      bait.className =
        'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links';
      bait.style.setProperty('width', '1px', 'important');
      bait.style.setProperty('height', '1px', 'important');
      bait.style.setProperty('position', 'absolute', 'important');
      bait.style.setProperty('left', '-10000px', 'important');
      bait.style.setProperty('top', '-1000px', 'important');

      document.body.appendChild(bait);

      // Wait a tiny bit for the extension to do its job
      await new Promise((resolve) => setTimeout(resolve, 100));

      // If the element has no height or is hidden, it was blocked
      if (
        bait.offsetParent === null ||
        bait.offsetHeight === 0 ||
        bait.offsetLeft === 0 ||
        bait.offsetTop === 0 ||
        bait.offsetWidth === 0 ||
        bait.clientHeight === 0 ||
        bait.clientWidth === 0
      ) {
        adBlockDetected = true;
      }

      document.body.removeChild(bait);

      // -----------------------------------------
      // TRAP 2: The Network Ping (Network Check)
      // -----------------------------------------
      // Only run if TRAP 1 didn't catch it
      if (!adBlockDetected) {
        try {
          // Try to fetch a known ad script. Next.js/Browsers will throw an error
          // if an extension blocks this request (net::ERR_BLOCKED_BY_CLIENT)
          await fetch(
            'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
            {
              method: 'HEAD',
              mode: 'no-cors',
              cache: 'no-store',
            }
          );
        } catch (error) {
          // If the fetch failed, it was likely blocked
          adBlockDetected = true;
        }
      }

      setIsAdBlockDetected(adBlockDetected);
    };

    detectAdBlocker();
  }, []);

  return isAdBlockDetected;
};
