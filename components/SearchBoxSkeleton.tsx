import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default async function SearchBoxSkeleton() {
  return (
    <Box sx={{ position: 'relative', height: 48, width: 384 }}>
      <Paper elevation={2} sx={{ display: 'flex', alignItems: 'center', borderRadius: 6 }}>
        <Typography
          variant="body2"
          color="textDisabled"
          sx={{
            width: 288,
            flex: '0 0 auto',
            mr: 'auto',
            pl: 2.5,
          }}
        >
          Adresse IP
        </Typography>

        <IconButton
          color="inherit" disabled
          aria-label="Search"
          sx={{ flex: '0 0 auto', m: 0.5 }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
