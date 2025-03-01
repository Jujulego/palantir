import { mergeSx } from '@/lib/utils/mui';
import type { ListItemProps } from '@mui/material';
import ListItem from '@mui/material/ListItem';

// Component
export interface VirtualItemProps extends ListItemProps {
  readonly rowIndex?: number;
}

export default function VirtualItem({ rowIndex, sx, ...rest }: VirtualItemProps) {
  return (
    <ListItem
      {...rest}
      sx={mergeSx(sx, { gridRow: rowIndex ? rowIndex + 1 : 'auto' })}
    />
  );
}