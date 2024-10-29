import IpQualityScoreIcon from '@/components/icons/IpQualityScoreIcon';
import Chip, { type ChipOwnProps } from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

// Component
export interface IpQualityScoreChipProps extends Omit<ChipOwnProps, 'label' | 'icon'> {}

export default function IpQualityScoreChip(props: IpQualityScoreChipProps) {
  return (
    <Tooltip title="IP Quality Score">
      <Chip {...props}
        icon={<IpQualityScoreIcon />}
        label={<><span style={{ color: '#F43A3A' }}>IP</span>QS</>}
      />
    </Tooltip>
  );
}