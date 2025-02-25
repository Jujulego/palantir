import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

// Loading
export default async function ConsoleUsersIdLoading() {
  return (
    <>
      <Breadcrumbs sx={{ mx: 3, my: 2 }}>
        <MuiLink underline="hover" color="inherit" component={Link} href="/console">Console</MuiLink>
        <MuiLink underline="hover" color="inherit" component={Link} href="/console/auth/users">Users</MuiLink>
        <Typography>
          <Skeleton width={250} />
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', mx: 3, mb: 3 }}>
        <Skeleton variant="circular" sx={{ height: 48, width: 48, mr: 2 }}  />

        <Typography component="h1" variant="h4" sx={{ flex: '1 0 0' }}>
          <Skeleton width="25%" />
        </Typography>
      </Box>

      <Divider />
    </>
  );
}