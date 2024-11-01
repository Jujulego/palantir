import { redirect } from 'next/navigation';

// Page
export interface WithMapIpPageProps {
  readonly params: Promise<{
    readonly ip: string;
  }>;
}

export default async function WithMapIpPage({ params }: WithMapIpPageProps) {
  const ip = decodeURIComponent((await params).ip);
  redirect(`/ip/${ip}/ip-info`);
}
