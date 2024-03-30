import React from 'react';
import { Button } from '../ui/button'; // Import your Button component
import { Petra, cn } from '@/lib/utils';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
    icon?: JSX.Element;
}

const IconButton:React.FC<IconButtonProps>  = ({ className, icon, children, ...props }) => {
  return (
    <Button
        variant={"ghost"}
        className={cn(
          "h-[63px] inline-flex flex-col items-center justify-center px-5 ",
          "text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-500",
          className )}
          {...props}>
            {icon}
        <span>{children}</span>
    </Button>
  );
};

export default IconButton;
