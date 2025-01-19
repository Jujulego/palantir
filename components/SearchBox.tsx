'use client';

import { useDnsLookup } from '@/hooks/useDnsLookup';
import ClearIcon from '@mui/icons-material/Clear';
import PetsIcon from '@mui/icons-material/Pets';
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
import { type FormEvent, type SyntheticEvent, useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { TransitionGroup } from 'react-transition-group';

// Component
export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const segments = useSelectedLayoutSegments();
  const theme = useTheme();

  // Search
  const [isSearching, startSearch] = useTransition();

  const handleSearch = useCallback((url: string) => {
    startSearch(() => {
      router.push(url);
    });
  }, [router]);

  const handleSearchAnimal = useCallback((name: string) => {
    handleSearch(`/animal/${encodeURIComponent(name)}`);
  }, [handleSearch]);

  const handleSearchIp = useCallback((ip: string, search?: string) => {
    const url = new URL(`/ip/${encodeURIComponent(ip)}?${searchParams}`, window.location.origin);

    if (search) {
      url.searchParams.set('name', search);
    }

    handleSearch(url.toString());
  }, [searchParams, handleSearch]);

  // Input value
  const selectedValue = decodeURIComponent(segments[1] ?? '');
  const [inputValue, setInputValue] = useState(searchParams.get('name') || selectedValue);

  const isIp = useMemo(() => ipaddr.isValid(inputValue), [inputValue]);
  const isAnimal = useMemo(() => inputValue.match(/^[A-Za-z]{3,}$/) !== null, [inputValue]);
  const isDns = useMemo(() => inputValue.match(/^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/) !== null, [inputValue]);

  const handleInputChange = useCallback((event: unknown, value: string) => {
    setInputValue(value);
  }, []);

  // Open management
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  // Load options
  const { ips, isLoading, isValidating } = useDnsLookup(isDns ? inputValue : null);

  const dnsOptions: Exclude<Option, string>[] = useMemo(() => {
    if (isLoading) {
      return [{ type: 'loading' }];
    }

    return ips.map((ip) => ({ type: 'dns', name: inputValue, ip }));
  }, [isLoading, ips, inputValue]);

  const options: Option[] = useMemo(() => {
    if (isAnimal) {
      const options = [...dnsOptions];
      options.push({ type: 'animal', name: inputValue });

      return options;
    } else if (dnsOptions.length === 0) {
      return [{ type: 'empty' }];
    } else {
      return dnsOptions;
    }
  }, [dnsOptions, inputValue, isAnimal]);

  // Selected value
  const [value, setValue] = useState<Option | null>(null);

  useEffect(() => {
    const search = searchParams.get('name');

    if (search) {
      setValue({ type: 'dns', name: search, ip: selectedValue });
    } else {
      setValue(selectedValue);
    }
  }, [searchParams, selectedValue]);

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
        if (isIp) {
          handleSearchIp(option);
          setOpen(false);
        } else if (isAnimal) {
          handleSearchAnimal(option);
          setOpen(false);
        }
      } else if (option.type === 'dns') {
        handleSearchIp(option.ip, option.name);
        setOpen(false);
      } else if (option.type === 'animal') {
        handleSearchAnimal(option.name);
        setOpen(false);
      }
    } else {
      router.push('/');
      setInputValue('');
      setOpen(false);
    }
  }, [handleSearchAnimal, handleSearchIp, inputValue, isAnimal, isIp, options, router]);

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
    open: open && (isDns || isAnimal),
    options,
    selectOnFocus: true,
    value,
  });

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();

    if (typeof value === 'string') {
      if (isIp) {
        handleSearchIp(inputValue);
      } else if (isAnimal) {
        handleSearchAnimal(inputValue);
      }
    } else if (typeof value === 'object') {
      if (value?.type === 'option') {
        handleSearch(value.url);
      } else if (value?.type === 'dns') {
        handleSearchIp(value.ip, value.name);
      } else if (value?.type === 'animal') {
        handleSearchAnimal(value.name);
      }
    }
  }, [handleSearch, handleSearchAnimal, handleSearchIp, inputValue, isAnimal, isIp, value]);

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

interface LoadingOption {
  type: 'loading';
}

interface EmptyOption {
  type: 'empty';
}

/** @deprecated */
interface AnimalOption {
  type: 'animal';
  name: string;
}

/** @deprecated */
interface DnsOption {
  type: 'dns';
  name: string;
  ip: string;
}

type Option = LoadingOption | EmptyOption | AnimalOption | DnsOption | SearchOption | string;

function getOptionDisabled(option: Option) {
  return typeof option === 'object' && option.type !== 'dns';
}

function getOptionKey(option: Option) {
  if (typeof option === 'string') {
    return 'input';
  }

  switch (option.type) {
    case 'option':
      return option.key;

    case 'dns':
      return `dns-${option.ip}`;

    default:
      return option.type;
  }
}

function getOptionLabel(option: Option) {
  if (typeof option === 'string') {
    return option;
  }

  switch (option.type) {
    case 'option':
      return option.label;

    case 'dns':
    case 'animal':
      return option.name;

    default:
      return option.type;
  }
}

function getOptionValue(option: Option): string {
  if (typeof option === 'string') {
    return option;
  }

  switch (option.type) {
    case 'dns':
      return option.ip;

    case 'animal':
      return option.name;

    case 'option':
      return option.url;

    default:
      return option.type;
  }
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

    case 'dns':
      return <Box sx={{ m: 0, px: 2, py: 0.75 }}>{ option.name }</Box>;

    case 'animal':
      return <Box sx={{ display: 'flex', m: 0, px: 2, py: 0.75, gap: 1 }}>
        <PetsIcon color="inherit"/>
        <Box sx={{ textTransform: 'capitalize' }}>
          {option.name}
        </Box>
      </Box>;

    case 'loading':
      return <Box sx={{ color: 'text.secondary', m: 0, px: 2, py: 0.75 }}>Resolving...</Box>;

    case 'empty':
      return <Box sx={{ color: 'text.secondary', m: 0, px: 2, py: 0.75 }}>No results</Box>;
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
