import IpDataChip from '@/components/source/IpDataChip';
import IpInfoChip from '@/components/source/IpInfoChip';
import IpQualityScoreChip from '@/components/source/IpQualityScoreChip';
import Chip, { type ChipOwnProps } from '@mui/material/Chip';

// Component
export interface SourceChipProps extends Omit<ChipOwnProps, 'label' | 'icon'> {
  readonly id: string;
}

export default function SourceChip({ id, ...rest }: SourceChipProps) {
  switch (id) {
    case 'ip-data':
      return <IpDataChip {...rest} />;

    case 'ip-info':
      return <IpInfoChip {...rest} />;

    case 'ip-quality-score':
      return <IpQualityScoreChip {...rest} />;

    default:
      return <Chip {...rest} label={id} />;
  }
}
