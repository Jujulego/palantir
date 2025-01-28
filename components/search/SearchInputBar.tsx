import { styled, type SxProps, type Theme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { type HTMLAttributes, memo, type Ref } from 'react';

// Components
export interface SearchInputBarProps {
  readonly inputRef?: Ref<HTMLInputElement>;
  readonly inputProps?: HTMLAttributes<HTMLInputElement>;

  readonly sx?: SxProps<Theme>;
}

function SearchInputBar(props: SearchInputBarProps) {
  const { inputRef, inputProps, sx } = props;

  return (
    <Stack component="label" direction="row" useFlexGap sx={sx}>
      <SearchInput ref={inputRef} {...inputProps} />
    </Stack>
  );
}

export default memo(SearchInputBar);

// Elements
const SearchInput = styled('input')(({ theme }) => ({
  flex: '0 1 100%',

  paddingTop: theme.spacing(0.5),
  paddingLeft: theme.spacing(2.5),
  paddingBottom: theme.spacing(0.5),
  paddingRight: theme.spacing(0),

  background: 'none',
  border: 'none',
  outline: 'none',
}));