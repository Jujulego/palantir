'use client';

import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { JsonView, allExpanded, defaultStyles, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

// Component
export interface JsonViewerProps {
  readonly data: Object;
}

export default function JsonViewer({ data }: JsonViewerProps) {
  const theme = useTheme();
  const styles = useMemo(() => theme.palette.mode === 'light' ? defaultStyles : darkStyles, [theme]);

  return <JsonView data={data} shouldExpandNode={allExpanded} style={styles} />;
}
