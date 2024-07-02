import MailIcon from '@mui/icons-material/Mail';
import NetworkCellIcon from '@mui/icons-material/NetworkCell';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PolylineIcon from '@mui/icons-material/Polyline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import { Box, Tooltip } from '@mui/material';

import { searchBigDataCloud } from '@/src/big-data-cloud/data';

// Component
export interface BigDataCloudTagsProps {
  readonly ip: string;
}

export default async function BigDataCloudTags({ ip }: BigDataCloudTagsProps) {
  const { hazardReport } = await searchBigDataCloud(ip);

  return <Box
    component="span" display="inline-flex" ml={1} gap={0.5}
    sx={{
      display: 'inline-flex',
      verticalAlign: 'middle',
      ml: 1, my: -0.25,
      gap: 1,
    }}
  >
    { hazardReport?.isCellular && (
      <Tooltip title="Cellular">
        <NetworkCellIcon fontSize="small" />
      </Tooltip>
    ) }
    { hazardReport?.isKnownAsMailServer && (
      <Tooltip title="Mail Server">
        <MailIcon fontSize="small" />
      </Tooltip>
    ) }
    { hazardReport?.isKnownAsTorServer && (
      <Tooltip title="TOR">
        <PolylineIcon fontSize="small" />
      </Tooltip>
    ) }
    { hazardReport?.isKnownAsVpn && (
      <Tooltip title="VPN">
        <VpnLockIcon fontSize="small" />
      </Tooltip>
    ) }
    { (hazardReport?.isSpamhausDrop || hazardReport?.isSpamhausEdrop || hazardReport?.isSpamhausAsnDrop) && (
      <Tooltip title="Spamhaus">
        <ReportGmailerrorredIcon fontSize="small" />
      </Tooltip>
    ) }
    { (hazardReport?.isBlacklistedUceprotect || hazardReport?.isBlacklistedBlocklistDe) && (
      <Tooltip title="Blacklisted">
        <PlaylistRemoveIcon fontSize="small" />
      </Tooltip>
    ) }
  </Box>;
}
