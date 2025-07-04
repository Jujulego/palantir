import { init } from '@sentry/nextjs';

// Sentry config
init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  _experiments: {
    enableLogs: true
  },
});
