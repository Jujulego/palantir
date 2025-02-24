import VirtualCell from '@/components/table/VirtualCell';
import VirtualRow, { type VirtualRowProps } from '@/components/table/VirtualRow';
import FormatDate from '@/components/utils/FormatDate';
import type { UserDto } from '@/lib/auth/users';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';

// Component
export interface VirtualUserRowProps extends VirtualRowProps {
  readonly user: UserDto;
}

export default function UserRow({ user, ...rest }: VirtualUserRowProps) {
  return (
    <VirtualRow {...rest}>
      <VirtualCell scope="row" sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
        <Avatar src={user.picture} alt={user.nickname ?? user.name} sx={{ height: 24, width: 24 }} />
        <span>{user.nickname ?? user.name}</span>
      </VirtualCell>
      <VirtualCell sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
        {user.identities.map((identity) => {
          switch (identity.connection) {
            case 'github':
              return <GitHubIcon key={identity.connection}/>;

            case 'Username-Password-Authentication':
              return <PersonIcon key={identity.connection}/>;

            default:
              return <PersonOutlineIcon key={identity.connection}/>;
          }
        })}
      </VirtualCell>
      <VirtualCell>
        <FormatDate date={user.last_login} format="lll" />
      </VirtualCell>
    </VirtualRow>
  );
}