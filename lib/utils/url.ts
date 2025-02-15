export function baseUrl(): string {
  return typeof window === 'undefined'
    ? process.env.APP_BASE_URL ?? `https://${process.env.VERCEL_BRANCH_URL}`
    : window.location.origin;
}
