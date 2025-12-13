export {};

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      target: string,
      params?: Record<string, unknown>
    ) => void;
  }
}
