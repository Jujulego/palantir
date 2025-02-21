'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type TransitionStartFunction,
  useCallback
} from 'react';

export interface TransitionLinkProps extends NextLinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  children?: ReactNode;
  startTransition: TransitionStartFunction;
}

export default function TransitionLink({ children, onClick, startTransition, ...rest }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(event);
    }
    
    if (event.defaultPrevented || !event.currentTarget.href || !startTransition) {
      return;
    }

    event.preventDefault();
    startTransition(() => {
      router.push(event.currentTarget.href);
    });
  }, [onClick, router, startTransition]);

  return <NextLink {...rest} onClick={handleClick}>{ children }</NextLink>;
}