import { permanentRedirect, RedirectType } from 'next/navigation';

// Page
export default async function WithMapServerIpPage({ params }: PageProps<'/server/[ip]'>) {
  permanentRedirect(`/server/${(await params).ip}/ip-info`, RedirectType.replace);
}
