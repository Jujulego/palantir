import type { SearchOption } from '@/components/search/search.context';
import Paper from '@mui/material/Paper';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { useComboBoxState } from '@react-stately/combobox';
import { m } from 'motion/react';

// Component
export interface SearchComboBoxProps {
  readonly inputValue: string;
  readonly onInputChange: (value: string) => void;
  readonly options: readonly SearchOption[];
  readonly sx?: SxProps<Theme>;
}

export function SearchComboBox({ inputValue, onInputChange, options, sx }: SearchComboBoxProps) {
  // Combo box state
  const state = useComboBoxState({
    items: options,
    inputValue,
    onInputChange
  });

  // Render
  const borderRadius = state.isOpen ? 16 : 24;

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