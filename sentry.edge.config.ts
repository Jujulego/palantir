import { init } from '@sentry/nextjs';

// Sentry config
init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV === 'production',

  enableLogs: true,
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
});
