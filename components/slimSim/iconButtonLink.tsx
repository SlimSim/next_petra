import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface IconButtonLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
  icon?: JSX.Element;
}

const IconButtonLink: React.FC<IconButtonLinkProps> = ({
  href,
  className,
  icon,
  children,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-[63px] flex-col items-center justify-center rounded-md px-5 text-sm text-gray-500',
        'hover:bg-accent hover:text-accent-foreground hover:text-yellow-600 dark:text-gray-400 dark:hover:text-yellow-500',
        className,
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default IconButtonLink;
