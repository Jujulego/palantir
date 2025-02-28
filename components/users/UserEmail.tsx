import type { UserDto } from '@/lib/users/user.dto';
import { mergeSx } from '@/lib/utils/mui';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

// Component
export interface UserEmailProps {
  readonly user: UserDto;
  readonly sx?: SxProps<Theme>;
}

export default function UserEmail({ user, sx }: UserEmailProps) {
  return (
    <Box sx={mergeSx({ display: 'flex', alignItems: 'center', gap: 1 }, sx)}>
      { user.email }
      { user.email_verified && (
        <Tooltip title="Verified" placement="right">
          <CheckIcon color="success" />
        </Tooltip>
      ) }
    </Box>
  );
}