import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// Page
export const revalidate = 0;

export default function Home() {
  const ip = headers().get('X-Forwarded-For');

  redirect(`/locate/${ip ?? '127.0.0.1'}`);
}
