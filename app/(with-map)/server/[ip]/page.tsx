import { type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import { permanentRedirect, RedirectType } from 'next/navigation';

// Page
export interface WithMapServerIpPageProps {
  readonly params: Promise<WithMapServerIpParams>;
  readonly searchParams: Promise<{
    readonly source?: string;
  }>
}

export default async function WithMapServerIpPage({ params, searchParams }: WithMapServerIpPageProps) {
  const search = new URLSearchParams(await searchParams);
  const source = search.get('source') ?? 'ip-info';
  search.delete('source');

  permanentRedirect(`/server/${(await params).ip}/${source}?${search}`, RedirectType.replace);
}
