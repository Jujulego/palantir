import CloudIcon from '@mui/icons-material/Cloud';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PolylineIcon from '@mui/icons-material/Polyline';
import PhishingIcon from '@mui/icons-material/Phishing';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Tooltip } from '@mui/material';

import { searchIpData } from '@/src/ip-data/data';

// Component
export interface IpDataTagsProps {
  readonly ip: string;
}

export default async function IpDataTags({ ip }: IpDataTagsProps) {
  const { threat } = await searchIpData(ip);

  return <Box
    component="span" display="inline-flex" ml={1} gap={0.5}
    sx={{
      display: 'inline-flex',
      verticalAlign: 'middle',
      ml: 1, mt: -0.5,
      gap: 1,
    }}
  >
    { threat?.is_datacenter && (
      <Tooltip title="Datacenter">
        <CloudIcon />
      </Tooltip>
    ) }
    { threat?.is_tor && (
      <Tooltip title="TOR">
        <PolylineIcon />
      </Tooltip>
    ) }
    { threat?.is_proxy && (
      <Tooltip title="Proxy">
        <NetworkPingIcon />
      </Tooltip>
    ) }
    { threat?.is_anonymous && (
      <Tooltip title="Anonymous">
        <QuestionMarkIcon />
      </Tooltip>
    ) }
    { threat?.is_known_attacker && (
      <Tooltip title="Attacker">
        <CoronavirusIcon />
      </Tooltip>
    ) }
    { threat?.is_known_abuser && (
      <Tooltip title="Abuser">
        <WarningIcon />
      </Tooltip>
    ) }
    { threat?.is_threat && (
      <Tooltip title="Threat">
        <PhishingIcon />
      </Tooltip>
    ) }
  </Box>;
}
