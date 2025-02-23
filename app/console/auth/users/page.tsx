import FormatDate from '@/components/utils/FormatDate';
import { queryUsers } from '@/lib/auth/users';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

// Page
export default async function ConsoleUsersPage() {
  const { users } = await queryUsers();

  return (
    <>
      <Typography component="h1" variant="h4" sx={{ flex: '0 0 auto', mx: 3, mt: 4, mb: 3 }}>
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
              <TableRow key={user.user_id}>
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