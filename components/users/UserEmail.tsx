import type { UserDto } from '@/lib/users/user.dto';
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';

// Component
export interface UserEmailProps {
  readonly user: UserDto;
}

export default function UserEmail({ user }: UserEmailProps) {
  return (
    <span>
      { user.email }
      { user.email_verified && (
        <Tooltip title="Verified" placement="right">
          <CheckIcon color="success" sx={{ ml: 1, verticalAlign: 'middle' }} />
        </Tooltip>
      ) }
    </span>
  );
}