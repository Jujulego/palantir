'use client';

import NoSsr from '@mui/material/NoSsr';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export interface FormatDateProps {
  readonly date: string;
  readonly format: string;
}

export default function FormatDate({ date, format }: FormatDateProps) {
  return <NoSsr>{ dayjs(date).format(format) }</NoSsr>;
}