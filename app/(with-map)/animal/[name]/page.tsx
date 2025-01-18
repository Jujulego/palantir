import { rawAnimalTracking } from '@/data/club-ocean';

// Page
export interface WithMapAnimalPageProps {
  readonly params: Promise<{
    readonly name: string;
  }>;
}

export default async function WithMapAnimalPage({ params }: WithMapAnimalPageProps) {
  const name = decodeURIComponent((await params).name);
  const data = await rawAnimalTracking(name);

  // Render
  return <code style={{ whiteSpace: 'pre' }}>{ data }</code>;
}
