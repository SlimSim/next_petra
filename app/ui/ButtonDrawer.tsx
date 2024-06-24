import React, { useState, useEffect, useRef, useMemo } from 'react';
import IconButton from '@/components/slimSim/iconButton';
import { ChevronDown, ChevronUp, DownloadIcon, UploadIcon } from 'lucide-react';
import { debounce } from 'lodash';
import { cn } from '@/lib/utils';

interface ButtonDrawerProps {
  children: React.ReactNode;
}

const ButtonDrawer: React.FC<ButtonDrawerProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleButtons, setVisibleButtons] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleButton = useMemo(
    () => (
      <IconButton
        onClick={toggleDrawer}
        icon={isOpen ? <ChevronDown /> : <ChevronUp />}
        className="transition-transform duration-1000 ease-in-out"
      >
        {isOpen ? 'shrink' : 'expand'}
      </IconButton>
    ),
    [isOpen, toggleDrawer],
  );

  useEffect(() => {
    const updateVisibleButtons = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const buttonWidth = 100; // Assuming each button is 100px wide
        const maxButtons = Math.floor(containerWidth / buttonWidth);

        const childArray = React.Children.toArray(children);
        setVisibleButtons(
          childArray.slice(0, maxButtons - 1).concat(toggleButton),
        );
      }
    };

    const debouncedUpdate = debounce(updateVisibleButtons, 200);
    updateVisibleButtons();
    window.addEventListener('resize', debouncedUpdate);

    return () => window.removeEventListener('resize', debouncedUpdate);
  }, [children, isOpen, toggleButton]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed bottom-0 left-0 w-full border-t border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-700',
        { 'h-auto': isOpen },
      )}
    >
      <div
        className={cn(
          'flex flex-wrap justify-between p-4 transition-all duration-1000 ease-in-out',
          { 'translate-y-0': isOpen },
        )}
      >
        {isOpen
          ? React.Children.map(
              children as React.ReactElement[],
              (child, index) => (
                <div key={index} className="m-1">
                  {child}
                </div>
              ),
            ).concat(
              <div key="toggle" className="m-1 ml-auto">
                {toggleButton}
              </div>,
            )
          : visibleButtons.map((child, index) => (
              <div key={index} className="m-1">
                {child}
              </div>
            ))}
      </div>
    </div>
  );
};

export default ButtonDrawer;
