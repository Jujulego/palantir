import { init, captureRouterTransitionStart, replayIntegration } from '@sentry/nextjs';


// Sentry config
init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [
    replayIntegration(),
  ],

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  _experiments: {
    enableLogs: true
  },
});

export const onRouterTransitionStart = captureRouterTransitionStart;
