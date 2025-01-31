import type { SearchOption } from '@/components/search/search.context';
import SearchInputBar from '@/components/search/SearchInputBar';
import SearchSurface from '@/components/search/SearchSurface';
import { mergeSx } from '@/utils/mui';
import { type SxProps, type Theme } from '@mui/material/styles';
import { useCallback, useState } from 'react';

// Component
export interface SearchComboBoxProps {
  readonly inputValue: string;
  readonly onInputChange: (value: string) => void;
  readonly options: readonly SearchOption[];
  readonly sx?: SxProps<Theme>;
}

export function SearchComboBox({ inputValue, onInputChange, options, sx }: SearchComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback(() => setIsOpen(false), []);

  // Render
  return (
    <SearchSurface
      isOpen={isOpen}
      onClose={handleClose}
      sx={mergeSx(sx, { height: 48 })}
    >
      <SearchInputBar
        inputValue={inputValue}
        onInputChange={onInputChange}
        sx={{ height: 48 }}
      />
    </SearchSurface>
  );
}