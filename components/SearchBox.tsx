'use client';

import { useDnsLookup } from '@/hooks/useDnsLookup';
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

  const handleSearch = useCallback((ip: string, search?: string) => {
    startSearch(() => {
      const url = new URL(`/ip/${encodeURIComponent(ip)}?${searchParams}`, window.location.origin);

      if (search) {
        url.searchParams.set('name', search);
      }

      router.push(url.toString());
    });
  }, [searchParams, router]);

  // Input value
  const selectedIp = decodeURIComponent(segments[1] ?? '');
  const [inputValue, setInputValue] = useState(searchParams.get('name') || selectedIp);

  const isIp = useMemo(() => ipaddr.isValid(inputValue), [inputValue]);
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

  const options: Option[] = useMemo(() => {
    if (isLoading) {
      return [{ type: 'loading' }];
    }

    if (ips.length) {
      return ips.map((ip) => ({ type: 'resolved', name: inputValue, ip }));
    } else {
      return [{ type: 'empty' }];
    }
  }, [isLoading, ips, inputValue]);

  // Selected value
  const [value, setValue] = useState<Option | null>(null);

  useEffect(() => {
    const search = searchParams.get('name');

    if (search) {
      setValue({ type: 'resolved', name: search, ip: selectedIp });
    } else {
      setValue(selectedIp);
    }
  }, [searchParams, selectedIp]);

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
        handleSearch(option);
        setOpen(false);
      } else if (option.type === 'resolved') {
        handleSearch(option.ip, option.name);
        setOpen(false);
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
    open: open && isDns,
    options,
    selectOnFocus: true,
    value,
  });

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();

    if (isIp) {
      handleSearch(inputValue);
    } else if (typeof value === 'string') {
      handleSearch(value);
    } else if (typeof value === 'object' && value?.type === 'resolved') {
      handleSearch(value.ip);
    }
  }, [handleSearch, inputValue, isIp, value]);

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
            type="search" placeholder="Adresse IP" required
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
interface LoadingOption {
  type: 'loading';
}

interface EmptyOption {
  type: 'empty';
}

interface ResolvedOption {
  type: 'resolved';
  name: string;
  ip: string;
}

type Option = LoadingOption | EmptyOption | ResolvedOption | string;

function getOptionDisabled(option: Option) {
  return typeof option === 'object' && option.type !== 'resolved';
}

function getOptionKey(option: Option) {
  if (typeof option === 'string') {
    return option;
  } else if (option.type === 'resolved') {
    return `resolved-${option.ip}`;
  } else {
    return option.type;
  }
}

function getOptionLabel(option: Option) {
  if (typeof option === 'string') {
    return option;
  } else if (option.type === 'resolved') {
    return option.name;
  } else {
    return option.type;
  }
}

function getOptionIp(option: Option): string {
  if (typeof option === 'string') {
    return option;
  } else if (option.type === 'resolved') {
    return option.ip;
  } else {
    return option.type;
  }
}

function isOptionEqualToValue(option: Option, value: Option): boolean {
  return getOptionIp(option) === getOptionIp(value);
}

function renderOption(option: Option) {
  if (typeof option === 'string' || option.type === 'resolved') {
    return <Box sx={{ m: 0, px: 2, py: 0.75 }}>{ getOptionIp(option) }</Box>;
  } else if (option.type === 'loading') {
    return <Box sx={{ color: 'text.secondary', m: 0, px: 2, py: 0.75 }}>Resolving...</Box>;
  } else if (option.type === 'empty') {
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
