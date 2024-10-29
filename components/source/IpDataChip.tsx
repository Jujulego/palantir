import IpDataIcon from '@/components/icons/IpDataIcon';
import Chip, { type ChipOwnProps } from '@mui/material/Chip';

// Component
export interface IpDataChipProps extends Omit<ChipOwnProps, 'label' | 'icon'> {}

export default function IpDataChip(props: IpDataChipProps) {
  return <Chip {...props} icon={<IpDataIcon />} label="ipdata" />;
}