'use client';

import { useTheme } from '@mui/material/styles';
import { JsonView, allExpanded } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

// Component
export interface JsonViewerProps {
  readonly data: Object;
}

export default function JsonViewer({ data }: JsonViewerProps) {
  const theme = useTheme();

  return <JsonView data={data} shouldExpandNode={allExpanded} style={theme.jsonViewStyles} />;
}
