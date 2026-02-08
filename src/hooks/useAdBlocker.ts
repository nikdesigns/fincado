import { useEffect, useState } from 'react';

export interface AdBlockDetectionOptions {
  delayMs?: number; // How long to wait before first check
  checkAttempts?: number; // Number of times to retry detection
  retryInterval?: number; // Time between retry attempts
}

export const useAdBlocker = (
  options: AdBlockDetectionOptions = {},
): boolean => {
  const {
    delayMs = 3000, // Wait 3 seconds (gives ads time to load)
    checkAttempts = 3, // Try 3 times before confirming
    retryInterval = 1000, // 1 second between attempts
  } = options;

  const [detected, setDetected] = useState(false);

  useEffect(() => {
    // Check if user has permanently dismissed the notice
    try {
      const dismissed = localStorage.getItem('adblock_notice_dismissed');
      if (dismissed === 'permanent') {
        return; // Don't even check if user has whitelisted
      }
    } catch {
      // localStorage not available, continue with detection
    }

    let attempts = 0;
    let timeoutId: NodeJS.Timeout;

    const checkAds = () => {
      attempts++;

      // Check if AdSense ads exist in DOM
      const ads = document.querySelectorAll('.adsbygoogle');

      if (!ads.length) {
        // No ads found yet - might still be loading
        if (attempts < checkAttempts) {
          timeoutId = setTimeout(checkAds, retryInterval);
        }
        return;
      }

      const ad = ads[0] as HTMLElement;

      // Multiple checks for reliable detection
      const isCollapsed = ad.offsetHeight === 0 || ad.clientHeight === 0;
      const isEmpty = ad.innerHTML.trim() === '';
      const isHidden = window.getComputedStyle(ad).display === 'none';
      const hasNoChildren = ad.children.length === 0;

      const isBlocked = isCollapsed || isEmpty || isHidden || hasNoChildren;

      if (isBlocked) {
        // Additional validation: check for ad block-specific signals
        const hasAdBlockSignals =
          document.querySelector('[id*="adblock"]') !== null ||
          document.querySelector('[class*="adblock"]') !== null ||
          window.getComputedStyle(ad).visibility === 'hidden';

        if (hasAdBlockSignals || attempts >= checkAttempts) {
          // Confirmed: ad blocker is active
          setDetected(true);
        } else if (attempts < checkAttempts) {
          // Not sure yet, retry
          timeoutId = setTimeout(checkAds, retryInterval);
        }
      } else {
        // Ads are loading properly
        setDetected(false);
      }
    };

    // Initial delay before first check
    timeoutId = setTimeout(checkAds, delayMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delayMs, checkAttempts, retryInterval]);

  return detected;
};
