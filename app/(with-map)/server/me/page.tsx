import { redirect } from 'next/navigation';

// Page
export const dynamic = 'force-static';

export default async function WithMapServerMePage() {
  redirect('/server/me/vercel');
}
