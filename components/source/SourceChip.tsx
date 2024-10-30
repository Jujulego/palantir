import IpDataChip from '@/components/source/IpDataChip';
import IpInfoChip from '@/components/source/IpInfoChip';
import IpQualityScoreChip from '@/components/source/IpQualityScoreChip';
import type { SourceId } from '@/data/sources';
import Chip, { type ChipOwnProps } from '@mui/material/Chip';

// Component
export interface SourceChipProps extends Omit<ChipOwnProps, 'label' | 'icon'> {
  readonly id: SourceId;
}

export default function SourceChip({ id, ...rest }: SourceChipProps) {
  switch (id) {
    case 'big-data-cloud':
      return <Chip label="BigDataCloud" {...rest} />;

    case 'ip-data':
      return <IpDataChip {...rest} />;

    case 'ip-geolocation':
      return <Chip label="ipgeolocation" {...rest} />;

    case 'ip-info':
      return <IpInfoChip {...rest} />;

    case 'ip-quality-score':
      return <IpQualityScoreChip {...rest} />;
  }
}
