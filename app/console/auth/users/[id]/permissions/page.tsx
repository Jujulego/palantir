import { type ConsoleUsersIdParams, decodeId } from '@/app/console/auth/users/[id]/params';
import { queryUser } from '@/lib/users/users';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { notFound } from 'next/navigation';

// Page
export interface ConsoleUsersIdPermissionsProps {
  readonly params: Promise<ConsoleUsersIdParams>;
}

export default async function ConsoleUsersIdPermissions({ params }: ConsoleUsersIdPermissionsProps) {
  const userId = await decodeId(params);
  const user = await queryUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <Box component="article" sx={{ flex: '1 0 0', p: 2, overflow: 'auto' }}>
      <section>
        <Typography component="h2" variant="h5" sx={{ mt: 2, mb: 1 }}>IP Address Metadata</Typography>
        <Divider />

        <List>
          <ListItem>
            <ListItemIcon>
              <Checkbox edge="start" />
            </ListItemIcon>
            <ListItemText
              primary="BigDataCloud"
              secondary={
                <>Access ip metadata retrieved using <MuiLink href="https://www.bigdatacloud.com" target="_blank">BigDataCloud API</MuiLink></>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Checkbox edge="start" />
            </ListItemIcon>
            <ListItemText
              primary="ipdata"
              secondary="Access ip metadata retreived using ipdata API"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Checkbox edge="start" />
            </ListItemIcon>
            <ListItemText
              primary="ipgeolocation"
              secondary="Access ip metadata retreived using ipgeolocation API"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Checkbox edge="start" />
            </ListItemIcon>
            <ListItemText
              primary="IP Quality Score"
              secondary="Access ip metadata retreived using IP Quality Score API"
            />
          </ListItem>
        </List>
      </section>

      <section>
        <Typography component="h2" variant="h5" sx={{ mt: 2, mb: 1 }}>Console</Typography>
        <Divider />

        <List>
          <ListItem>
            <ListItemIcon>
              <Checkbox edge="start" />
            </ListItemIcon>
            <ListItemText
              primary="Read users"
              secondary="Access users list and details"
            />
          </ListItem>
        </List>
      </section>
    </Box>
  );
}
