export {};

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetIdOrEventName: string,
      params?: Record<string, never>
    ) => void;
  }
}
