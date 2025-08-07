// Type definitions for Cloudflare Turnstile and reCAPTCHA
declare global {
  interface Window {
    // Cloudflare Turnstile
    turnstile?: {
      render: (container: string | HTMLElement, params: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        'expired-callback'?: () => void;
        'timeout-callback'?: () => void;
      }) => string;
      reset: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
    
    // Google reCAPTCHA (used by Cloudflare Turnstile)
    grecaptcha?: {
      getResponse: (widgetId?: string) => string;
      render: (container: string | HTMLElement, parameters: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        'expired-callback'?: () => void;
      }) => string;
      reset: (widgetId?: string) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready: (callback: () => void) => void;
    };
  }
}
