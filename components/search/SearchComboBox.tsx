import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { ChangeEvent, useCallback } from 'react';

// Component
export interface SearchComboBoxProps {
  readonly inputValue: string;
  readonly onInputChange: (value: string) => void;
  readonly sx?: SxProps<Theme>;
}

export function SearchComboBox({ inputValue, onInputChange, sx }: SearchComboBoxProps) {
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.currentTarget.value);
  }, [onInputChange]);

  const handleClear = useCallback(() => {
    onInputChange('');
  }, [onInputChange]);

  // Render
  return (
    <Stack component={SearchInputBox} direction="row" useFlexGap sx={sx}>
      <SearchInput
        value={inputValue}
        onChange={handleChange}

        autoCorrect="off"
        autoComplete="off"
        placeholder="Search..."
        spellCheck={false}
        type="search"

        aria-autocomplete="list"
        aria-expanded="false"
        aria-label="Search"
        role="combobox"
      />

      <Fade in={!!inputValue}>
        <IconButton
          type="button"
          tabIndex={-1}
          onClick={handleClear}

          color="inherit"
          size="small"
          sx={{ position: 'absolute', right: 44, top: 8 }}

          aria-label="Clear"
        >
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </Fade>

      <IconButton color="inherit" type="button" aria-label="Search" sx={{ my: 'auto' }}>
        <SearchIcon />
      </IconButton>
    </Stack>
  );
}

// Elements
const SearchInputBox = styled('div')(({ theme }) => ({
  position: 'relative',

  padding: theme.spacing(0.5),
  borderRadius: 'var(--SearchSurface-shape)',
  outline: '0px solid transparent',
  outlineOffset: '-2.5px',

  transition: theme.transitions.create(['outline-color', 'outline-width'], { duration: theme.transitions.duration.shortest }),

  '&:focus-within': {
    outlineColor: theme.vars.palette.primary.main,
    outlineWidth: '1.5px',
  },
}));

const SearchInput = styled('input')(({ theme }) => ({
  flex: '0 1 100%',

  paddingLeft: theme.spacing(2),
  paddingRight: 30,

  background: 'none',
  border: 'none',
  borderTopLeftRadius: `calc(var(--SearchSurface-shape) - ${theme.spacing(0.5)})`,
  borderTopRightRadius: theme.shape.borderRadius,
  borderBottomLeftRadius: `calc(var(--SearchSurface-shape) - ${theme.spacing(0.5)})`,
  borderBottomRightRadius: theme.shape.borderRadius,
  color: 'inherit',
  outline: 'none',

  transition: theme.transitions.create('background-color', { duration: theme.transitions.duration.shortest }),

  '&:hover': {
    backgroundColor: theme.vars.palette.action.hover,
  },

  '&::-webkit-search-cancel-button': {
    'WebkitAppearance': 'none',
  },
}));
