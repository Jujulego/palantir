import { permanentRedirect, RedirectType } from 'next/navigation';

export interface WithMapIpPageProps {
  readonly params: Promise<{
    readonly ip: string;
  }>;
}

export default async function WithMapIpPage({ params }: WithMapIpPageProps) {
  permanentRedirect(`/server/${(await params).ip}`, RedirectType.replace);
}
