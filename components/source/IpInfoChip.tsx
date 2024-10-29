import IpInfoIcon from '@/components/icons/IpInfoIcon';
import Chip, { type ChipOwnProps } from '@mui/material/Chip';

// Component
export interface IpInfoChipProps extends Omit<ChipOwnProps, 'label' | 'icon'> {}

export default function IpInfoChip(props: IpInfoChipProps) {
  return <Chip {...props} icon={<IpInfoIcon />} label="IPinfo" />;
}