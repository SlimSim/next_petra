import React from 'react';
import { Button } from '../ui/button'; // Import your Button component
import { cn } from '@/lib/utils';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  icon?: JSX.Element;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  className,
  icon,
  children,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      variant={'ghost'}
      className={cn(
        'inline-flex h-[63px] flex-col items-center justify-center px-5 ',
        'text-sm text-gray-500 hover:text-yellow-600 dark:text-gray-400 dark:hover:text-yellow-500',
        className,
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </Button>
  );
};

export default IconButton;
