export {};

declare global {
  interface Window {
    gtag?: (...args: never[]) => void;
    adsbygoogle?: unknown[];
  }
}
