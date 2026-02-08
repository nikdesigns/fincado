export {};

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      eventParams?: Record<string, any>,
    ) => void;
    adsbygoogle?: unknown[];
  }
}
