'use client';

import IpQualityScoreIcon from '@/components/icons/IpQualityScoreIcon';
import { styled } from '@mui/material/styles';

export default function IpQualityScoreOption() {
  return (
    <>
      <IpQualityScoreIcon sx={{ fontSize: 'var(--ServerMenu-icon-width)' }}/>
      <span><IpQualityScoreEm>IP</IpQualityScoreEm>QS</span>
    </>
  );
}

const IpQualityScoreEm = styled('em')(({ theme }) => ({
  fontStyle: 'normal',
  color: theme.vars.palette.ipQualityScore.main,
}));