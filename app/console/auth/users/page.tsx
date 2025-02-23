import FormatDate from '@/components/utils/FormatDate';
import { queryUsers } from '@/lib/auth/users';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

// Page
export default async function ConsoleUsersPage() {
  const { users } = await queryUsers();

  return (
    <>
      <Breadcrumbs sx={{ mx: 3, my: 2 }}>
        <MuiLink underline="hover" color="inherit" component={Link} href="/console">Console</MuiLink>
        <Typography sx={{ color: 'text.primary' }}>Users</Typography>
      </Breadcrumbs>

      <Typography component="h1" variant="h4" sx={{ flex: '0 0 auto', mx: 3, mb: 3 }}>
        Users
      </Typography>

      <Divider />

      <TableContainer sx={{ flex: '1 0 0' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell scope="col" sx={{ py: 1 }}>Name</TableCell>
              <TableCell scope="col" sx={{ py: 1 }}>Identities</TableCell>
              <TableCell scope="col" sx={{ py: 1 }}>Last login</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.map((user) => (
              <TableRow key={user.user_id} hover>
                <TableCell scope="row">
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Avatar src={user.picture} alt={user.nickname ?? user.name} sx={{ height: 24, width: 24 }} />
                    { user.nickname ?? user.name }
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" gap={1}>
                    { user.identities.map((identity) => {
                      switch (identity.connection) {
                        case 'github':
                          return <GitHubIcon key={identity.connection} />;

                        case 'Username-Password-Authentication':
                          return <PersonIcon key={identity.connection} />;

                        default:
                          return <PersonOutlineIcon key={identity.connection} />;
                      }
                    }) }
                  </Stack>
                </TableCell>
                <TableCell>
                  <FormatDate date={user.last_login} format="lll" />
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}