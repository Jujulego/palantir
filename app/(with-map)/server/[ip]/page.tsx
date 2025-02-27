import { type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import { permanentRedirect, RedirectType } from 'next/navigation';

// Page
export interface WithMapServerIpPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WithMapServerIpPage({ params }: WithMapServerIpPageProps) {
  permanentRedirect(`/server/${(await params).ip}/ip-info`, RedirectType.replace);
}

export function generateStaticParams(): WithMapServerIpParams[] {
  return [];
}