"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export function ActiveLink({ 
  href, 
  children, 
  className = '', 
  activeClassName = '', 
  inactiveClassName = '' 
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  const linkClassName = `${className} ${isActive ? activeClassName : inactiveClassName}`;

  return (
    <Link
      href={href}
      className={linkClassName}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
