import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// Page
export interface HomeProps {
  readonly searchParams: {
    readonly ip?: string;
  }
}

export default function Home(props: HomeProps) {
  const ip = headers().get('X-Forwarded-For');

  redirect(`/locate/${ip ?? '127.0.0.1'}`);
}
