'use client';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export interface FormatDateProps {
  readonly date: string;
  readonly format: string;
}

export default function FormatDate({ date, format }: FormatDateProps) {
  return dayjs(date).format(format);
}