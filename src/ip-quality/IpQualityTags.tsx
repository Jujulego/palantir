import NetworkCellIcon from '@mui/icons-material/NetworkCell';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import PolylineIcon from '@mui/icons-material/Polyline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Tooltip } from '@mui/material';

import { searchIpQuality } from '@/src/ip-quality/data';

// Component
export interface IpQualityTagsProps {
  readonly ip: string;
}

export default async function IpQualityTags({ ip }: IpQualityTagsProps) {
  const result = await searchIpQuality(ip);

  return <Box
    component="span" display="inline-flex" ml={1} gap={0.5}
    sx={{
      display: 'inline-flex',
      verticalAlign: 'middle',
      ml: 1, mt: -0.5,
      gap: 1,
    }}
  >
    { result.mobile && (
      <Tooltip title="Cellular">
        <NetworkCellIcon />
      </Tooltip>
    ) }
    { result.bot_status && (
      <Tooltip title="Bot">
        <TravelExploreIcon />
      </Tooltip>
    ) }
    { (result.tor || result.active_tor) && (
      <Tooltip title="TOR">
        <PolylineIcon />
      </Tooltip>
    ) }
    { (result.vpn || result.active_vpn) && (
      <Tooltip title="VPN">
        <VpnLockIcon />
      </Tooltip>
    ) }
    { result?.proxy && (
      <Tooltip title="Proxy">
        <NetworkPingIcon />
      </Tooltip>
    ) }
    { result.recent_abuse && (
      <Tooltip title="Abuser">
        <WarningIcon />
      </Tooltip>
    ) }
  </Box>;
}
