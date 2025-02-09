import { permanentRedirect, RedirectType } from 'next/navigation';

export interface WithMapIpPageProps {
  readonly params: Promise<{
    readonly ip: string;
  }>;
  readonly searchParams: Promise<Record<string, string>>;
}

export default async function WithMapIpPage({ params, searchParams }: WithMapIpPageProps) {
  const search = new URLSearchParams(await searchParams);

  permanentRedirect(`/server/${(await params).ip}?${search}`, RedirectType.replace);
}
