'use client';

import { useAnimalSearchOptions } from '@/hooks/useAnimalSearchOptions';
import { useDnsSearchOptions } from '@/hooks/useDnsSearchOptions';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import useAutocomplete from '@mui/material/useAutocomplete';
import ipaddr from 'ipaddr.js';
import { useRouter, useSearchParams, useSelectedLayoutSegments } from 'next/navigation';
import { type FormEvent, type SyntheticEvent, useCallback, useMemo, useState, useTransition } from 'react';
import { TransitionGroup } from 'react-transition-group';

// Component
export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const segments = useSelectedLayoutSegments();
  const theme = useTheme();

  // Search
  const [isSearching, startSearch] = useTransition();
  const handleSearch = useCallback((url: string) => startSearch(() => router.push(url)), [router]);

  // Input value
  const selectedValue = decodeURIComponent(segments[1] ?? '');
  const [inputValue, setInputValue] = useState(searchParams.get('name') || selectedValue);

  const isIp = useMemo(() => ipaddr.isValid(inputValue), [inputValue]);

  const handleInputChange = useCallback((event: unknown, value: string) => {
    setInputValue(value);
  }, []);

  // Open management
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  // Load options
  const animalOptions = useAnimalSearchOptions(inputValue);
  const dnsOptions = useDnsSearchOptions(inputValue);
  const isLoading = animalOptions.isLoading || dnsOptions.isLoading;
  const isValidating = animalOptions.isValidating || dnsOptions.isValidating;

  const options = useMemo(() => [
    ...animalOptions.options,
    ...dnsOptions.options,
  ], [animalOptions.options, dnsOptions.options]);

  // Selected value
  const [value, setValue] = useState<Option | null>(null);

  const handleChange = useCallback((event: SyntheticEvent, option: Option | null) => {
    if (typeof option === 'string' && !ipaddr.isValid(inputValue)) {
      if (options.length > 0) {
        option = options[0];
      } else {
        return;
      }
    }

    setValue(option);

    if (option) {
      if (typeof option === 'string') {
        const option = options.find((opt) => typeof opt === 'object' && opt?.type === 'option');

        if (option) {
          handleSearch(option.url);
        }
      } else if (option.type === 'option') {
        handleSearch(option.url);
      }
    } else {
      router.push('/');
      setInputValue('');
      setOpen(false);
    }
  }, [handleSearch, inputValue, options, router]);

  // Autocomplete
  const {
    expanded,
    getClearProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    getRootProps,
    setAnchorEl
  } = useAutocomplete({
    componentName: 'SearchBox',
    filterOptions: (opt) => opt,
    freeSolo: true,
    disableCloseOnSelect: true,
    getOptionDisabled,
    getOptionKey,
    getOptionLabel,
    inputValue: inputValue,
    isOptionEqualToValue,
    onChange: handleChange,
    onClose: handleClose,
    onInputChange: handleInputChange,
    onOpen: handleOpen,
    open: open && (animalOptions.isSearching || dnsOptions.isSearching),
    options,
    selectOnFocus: true,
    value,
  });

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();

    if (typeof value === 'string') {
      const option = options.find((opt) => typeof opt === 'object' && opt?.type === 'option');

      if (option) {
        handleSearch(option.url);
      }
    } else if (typeof value === 'object') {
      if (value?.type === 'option') {
        handleSearch(value.url);
      }
    }
  }, [handleSearch, options, value]);

  // Render
  return (
    <Box ref={setAnchorEl} sx={{ position: 'relative', height: 48, width: 384 }}>
      <Paper
        component="form" role="search"
        elevation={2}
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          borderRadius: expanded ? 4 : 6,
          overflow: 'hidden',
          transition: ({ transitions }) => transitions.create('border-radius')
        }}
      >
        <Box {...getRootProps()} sx={{ display: 'flex', boxShadow: 1 }}>
          <SearchInput
            {...getInputProps()}
            type="search" placeholder="Search" required
          />

          <Fade in={!!inputValue}>
            <IconButton
              {...getClearProps()}
              aria-label="Clear"
              color="inherit"
              sx={{ flex: '0 0 auto', m: 0.5 }}
            >
              <ClearIcon />
            </IconButton>
          </Fade>

          { isSearching ? (
            <CircularProgress size={24} sx={{ m: 1.5, flex: '0 0 auto' }} />
          ) : (
            <IconButton
              color="inherit" disabled={!isIp}
              aria-label="Search"
              type="submit"
              sx={{ flex: '0 0 auto', m: 0.5 }}
            >
              <SearchIcon />
            </IconButton>
          ) }
        </Box>

        <Collapse in={expanded} unmountOnExit>
          <Box sx={{ position: 'relative', minHeight: 52, py: 1 }}>
            <Fade in={isValidating} unmountOnExit>
              <LinearProgress
                aria-label="Resolving"
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
              />
            </Fade>

            <MenuList {...getListboxProps()} disablePadding>
              <TransitionGroup component={null}>
                { (isLoading || options.length === 0) && (
                  <MenuItem
                    component={Collapse}
                    disabled
                    sx={{ color: 'text.secondary', px:2, py: 0.75 }}
                    timeout={{
                      enter: theme.transitions.duration.enteringScreen,
                      exit: theme.transitions.duration.leavingScreen
                    }}
                  >
                    { isLoading && 'Loading...' }
                    { (!isLoading && options.length === 0) && 'No options found.' }
                  </MenuItem>
                ) }

                { options.map((option, index) => {
                  const { key, ...optionProps } = getOptionProps({ option, index });

                  return <MenuItem
                    key={key}
                    {...optionProps}
                    component={Collapse}
                    selected={optionProps['aria-selected'] === true}
                    sx={{ p: 0 }}
                    timeout={{
                      enter: theme.transitions.duration.enteringScreen,
                      exit: theme.transitions.duration.leavingScreen
                    }}
                  >
                    { renderOption(option) }
                  </MenuItem>;
                }) }
              </TransitionGroup>
            </MenuList>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}

// Options
export interface SearchOption {
  type: 'option';
  key: string;
  label: string;
  url: string;
}

export interface SearchHookState {
  options: readonly SearchOption[];
  isLoading: boolean;
  isValidating: boolean;
  isSearching: boolean;
}

type Option = SearchOption | string;

function getOptionDisabled(option: Option) {
  return typeof option === 'object' && ['empty'].includes(option.type);
}

function getOptionKey(option: Option) {
  if (typeof option === 'string') {
    return 'input';
  }

  if (option.type === 'option') {
    return option.key;
  }

  return option.type;
}

function getOptionLabel(option: Option) {
  if (typeof option === 'string') {
    return option;
  }

  if (option.type === 'option') {
    return option.label;
  }

  return option.type;
}

function getOptionValue(option: Option): string {
  if (typeof option === 'string') {
    return option;
  }

  if (option.type === 'option') {
    return option.url;
  }

  return option.type;
}

function isOptionEqualToValue(option: Option, value: Option): boolean {
  return getOptionValue(option) === getOptionValue(value);
}

function renderOption(option: Option) {
  if (typeof option === 'string') {
    return <Box sx={{ m: 0, px: 2, py: 0.75 }}>{ option }</Box>;
  }

  switch (option.type) {
    case 'option':
      return <Box sx={{ m: 0, px: 2, py: 0.75 }}>{ option.label }</Box>;

    /*case 'dns':
      return <Box sx={{ m: 0, px: 2, py: 0.75 }}>{ option.name }</Box>;

    case 'animal':
      return <Box sx={{ display: 'flex', m: 0, px: 2, py: 0.75, gap: 1 }}>
        <PetsIcon color="inherit"/>
        <Box sx={{ textTransform: 'capitalize' }}>
          {option.name}
        </Box>
      </Box>;*/
  }
}

// Utils
const SearchInput = styled('input')(({ theme }) => ({
  width: 288,
  flex: '0 0 auto',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.fontSize,
  paddingLeft: theme.spacing(2.5),
  paddingTop: theme.spacing(0.5),
  paddingRight: 0,
  paddingBottom: theme.spacing(0.5),
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  '&::-webkit-search-cancel-button': {
    'WebkitAppearance': 'none',
  }
}));
