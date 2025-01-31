import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { type HTMLAttributes, Ref } from 'react';

// Components
export interface SearchInputBarProps {
  readonly inputRef?: Ref<HTMLInputElement>;
  readonly inputProps?: HTMLAttributes<HTMLInputElement>;

  readonly sx?: SxProps<Theme>;
}

export default function SearchInputBar({ inputRef, inputProps, sx }: SearchInputBarProps) {
  return (
    <Stack component={SearchInputContainer} direction="row" useFlexGap sx={sx}>
      <SearchInput
        ref={inputRef}
        {...inputProps}

        autoCorrect="off"
        autoComplete="off"
        placeholder="Search..."
        type="search"

        aria-autocomplete="list"
        aria-expanded="false"
        aria-label="Search"
        role="combobox"
      />

      <IconButton color="inherit" size="small" type="button" tabIndex={-1} aria-label="Clear" sx={{ position: 'absolute', right: 44, top: 8 }}>
        <ClearIcon fontSize="inherit" />
      </IconButton>

      <IconButton color="inherit" type="button" aria-label="Search" sx={{ my: 'auto' }}>
        <SearchIcon />
      </IconButton>
    </Stack>
  );
}

// Elements
const SearchInputContainer = styled('div')(({ theme }) => ({
  position: 'relative',

  padding: `calc(${theme.spacing(0.5)} - 2px)`,

  border: '2px solid transparent',
  borderRadius: 'var(--SearchSurface-shape)',

  transition: theme.transitions.create('border-color', { duration: theme.transitions.duration.shortest }),

  '&:focus-within': {
    borderColor: theme.vars.palette.primary.main,
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
