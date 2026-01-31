import type { UserIdentity } from '@/lib/users/user.dto';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Tooltip from '@mui/material/Tooltip';

export interface UserIdentitiesProps {
  readonly identities: readonly UserIdentity[];
}

export default function UserIdentities({ identities }: UserIdentitiesProps) {
  return (
    <div className="flex items-center py-0 gap-2">
      { identities.map((identity) => {
        switch (identity.connection) {
          case 'github':
            return (
              <Tooltip key={identity.user_id} title="GitHub">
                <GitHubIcon />
              </Tooltip>
            );

          case 'google-oauth2':
            return (
              <Tooltip key={identity.user_id} title="Google OAuth2">
                <GoogleIcon />
              </Tooltip>
            );

          case 'Username-Password-Authentication':
            return (
              <Tooltip key={identity.user_id} title="Auth0">
                <PersonIcon />
              </Tooltip>
            );

          default:
            return (
              <Tooltip key={identity.user_id} title={identity.connection}>
                <PersonOutlineIcon />
              </Tooltip>
            );
        }
      }) }
    </div>
  );
}
