import { permanentRedirect, RedirectType } from 'next/navigation';

// Page
export default async function WithMapServerMePage() {
  permanentRedirect('/server/me/vercel', RedirectType.replace);
}
