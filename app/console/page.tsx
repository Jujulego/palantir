import { queryUsers } from '@/lib/auth/users';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default async function AdminPage() {
  const { total: userCount } = await queryUsers({ includeTotals: true, perPage: 0 });

  return (
    <>
      <Breadcrumbs sx={{ mx: 3, my: 2 }}>
        <Typography sx={{ color: 'text.primary' }}>Console</Typography>
      </Breadcrumbs>

      <Typography component="h1" variant="h4" sx={{ flex: '0 0 auto', mx: 3, mb: 3 }}>
        Dashboard
      </Typography>

      <Grid2 container spacing={2} padding={2}>
        <Grid2 size={3}>
          <Card>
            <CardActionArea component={Link} href="/console/auth/users">
              <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  User count
                </Typography>
                <Typography component="div" variant="h4">{ userCount }</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
      </Grid2>
    </>
  );
}
