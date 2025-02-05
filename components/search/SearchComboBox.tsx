import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress } from '@mui/material';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { ChangeEvent, KeyboardEvent, useCallback, useTransition } from 'react';

// Component
export interface SearchComboBoxProps {
  readonly activeOptionId: string | null;
  readonly inputValue: string;
  readonly isOpen: boolean;
  readonly listBoxId: string;
  readonly onClose?: () => void;
  readonly onFocusDown: () => void;
  readonly onFocusUp?: () => void;
  readonly onInputChange: (value: string) => void;
  readonly onSearch?: () => void;
  readonly onOpen?: () => void;
  readonly sx?: SxProps<Theme>;
}

export function SearchComboBox(props: SearchComboBoxProps) {
  const {
    activeOptionId,
    isOpen,
    inputValue,
    listBoxId,
    onClose,
    onFocusDown,
    onFocusUp,
    onInputChange,
    onSearch,
    onOpen,
    sx
  } = props;

  const [isSearching, startSearch] = useTransition();

  const handleSearch = useCallback(() => {
    onSearch && startSearch(() => onSearch());
  }, [onSearch]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.currentTarget.value);
  }, [onInputChange]);
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        handleSearch();
        break;

      case 'ArrowDown':
        if (event.altKey) {
          if (onOpen) onOpen();
        } else {
          onFocusDown();
        }
        
        break;

      case 'ArrowUp':
        if (event.altKey) {
          if (onClose) onClose();
        } else {
          if (onFocusUp) onFocusUp();
        }
        
        break;
    }
  }, [handleSearch, onOpen, onFocusDown, onClose, onFocusUp]);

  const handleClear = useCallback(() => {
    onInputChange('');
  }, [onInputChange]);
  
  // Render
  return (
    <Stack component={SearchInputBox} direction="row" useFlexGap sx={sx}>
      <SearchInput
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}

        autoCorrect="off"
        autoComplete="off"
        placeholder="Search..."
        spellCheck={false}
        type="search"

        aria-activedescendant={activeOptionId || undefined}
        aria-autocomplete="list"
        aria-controls={listBoxId}
        aria-expanded={isOpen}
        aria-label="Search"
        role="combobox"
      />

      <Fade in={!!inputValue} unmountOnExit>
        <IconButton
          type="button"
          tabIndex={-1}
          onClick={handleClear}

          color="inherit"
          size="small"
          sx={{ position: 'absolute', right: 44, top: 10 }}

          aria-label="Clear"
        >
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </Fade>

      <IconButton
        type="button"
        loading={isSearching}
        loadingIndicator={<CircularProgress size={20} />}
        onClick={handleSearch}

        color="inherit"
        sx={{ my: 'auto' }}

        aria-label="Search"
      >
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
  boxShadow: theme.vars.shadows[1],
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
