import type { UserIdentity } from '@/lib/users/user.dto';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

export interface UserIdentitiesProps {
  readonly identities: readonly UserIdentity[];
}

export default function UserIdentities({ identities }: UserIdentitiesProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 0, gap: 1 }}>
      { identities.map((identity) => {
        switch (identity.connection) {
          case 'github':
            return (
              <Tooltip key={identity.connection} title="GitHub">
                <GitHubIcon />
              </Tooltip>
            );

          case 'Username-Password-Authentication':
            return (
              <Tooltip key={identity.connection} title="Auth0">
                <PersonIcon />
              </Tooltip>
            );

          default:
            return (
              <Tooltip key={identity.connection} title={identity.connection}>
                <PersonOutlineIcon />
              </Tooltip>
            );
        }
      }) }
    </Box>
  );
}