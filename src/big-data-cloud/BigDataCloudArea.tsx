import { pink } from '@mui/material/colors';

import { searchBigDataCloud } from '@/src/big-data-cloud/data';
import MapboxArea from '@/src/mapbox/MapboxArea';
import MapboxGate from '@/src/mapbox/MapboxGate';

// Component
export interface BigDataCloudAreaProps {
  readonly ip: string;
}

export default async function BigDataCloudArea({ ip }: BigDataCloudAreaProps) {
  const result = await searchBigDataCloud(ip);

  if (!result.confidenceArea) {
    return null;
  }

  return (
    <MapboxGate>
      <MapboxArea
        lineColor={pink[300]}
        lineWidth={1}
        fillColor={pink[300]}
        fillOpacity={0.2}
        polygon={result.confidenceArea.map((pt) => [pt.longitude, pt.latitude])}
      />
    </MapboxGate>
  );
}
