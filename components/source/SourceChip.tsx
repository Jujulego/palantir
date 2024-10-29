import IpInfoChip from '@/components/source/IpInfoChip';
import Chip, { type ChipOwnProps } from '@mui/material/Chip';

// Component
export interface SourceChipProps extends Omit<ChipOwnProps, 'label' | 'icon'> {
  readonly id: string;
}

export default function SourceChip({ id, ...rest }: SourceChipProps) {
  switch (id) {
    case 'ip-info':
      return <IpInfoChip {...rest} />

    default:
      return <Chip {...rest} label={id} />;
  }
}
