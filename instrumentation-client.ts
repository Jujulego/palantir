import { init, captureRouterTransitionStart, replayIntegration } from '@sentry/nextjs';


// Sentry config
init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV === 'production',

  integrations: [
    replayIntegration(),
  ],

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  tracesSampleRate: 1.0
});

export const onRouterTransitionStart = captureRouterTransitionStart;
