import Paper from '@mui/material/Paper';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { m } from 'motion/react';
import { useState } from 'react';

// Component
export interface SearchComboBoxProps {
  readonly sx?: SxProps<Theme>;
}

export function SearchComboBox({ sx }: SearchComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Render
  const borderRadius = isOpen ? 16 : 24;

  return (
    <SearchComboBoxPlaceholder
      initial={{ borderRadius }}
      animate={{ borderRadius }}
      sx={sx}
    >
      <SearchComboBoxSurface
        elevation={2}
        initial={{ borderRadius }}
        animate={{ borderRadius }}
        sx={sx}
      />
    </SearchComboBoxPlaceholder>
  );
}

// UI
const SearchComboBoxPlaceholder = styled(m.div)({
  position: 'relative',
  height: 48,
});

const SearchComboBoxSurface = styled(m.create(Paper))({
  position: 'absolute',
  minHeight: '100%',
  width: '100%',
});