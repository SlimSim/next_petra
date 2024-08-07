import React, { useState, useEffect, useRef, useMemo } from 'react';
import IconButton from '@/components/slimSim/iconButton';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { debounce } from 'lodash';
import { cn } from '@/lib/utils';

interface ButtonDrawerProps {
  children: React.ReactNode;
}

const ButtonDrawer: React.FC<ButtonDrawerProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleButtons, setVisibleButtons] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleButton = useMemo(
    () => (
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        icon={isOpen ? <ChevronDown /> : <ChevronUp />}
        className="transition-transform duration-1000 ease-in-out"
      >
        {isOpen ? 'Shrink' : 'Expand'}
      </IconButton>
    ),
    [isOpen],
  );

  useEffect(() => {
    const updateVisibleButtons = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const buttonWidth = 64; // Assuming each button is 64px or tailwind w-16 wide :)
        const maxButtons = Math.floor(containerWidth / buttonWidth);

        const childArray = React.Children.toArray(children);

        if (maxButtons < childArray.length) {
          setVisibleButtons(
            childArray.slice(0, maxButtons - 1).concat(toggleButton),
          );
        } else {
          setVisibleButtons(childArray);
        }
      }
    };

    const debouncedUpdate = debounce(updateVisibleButtons, 100);
    updateVisibleButtons();
    window.addEventListener('resize', debouncedUpdate);

    return () => window.removeEventListener('resize', debouncedUpdate);
  }, [children, isOpen, toggleButton]);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 w-full border-t border-gray-200 bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-700',
        { 'h-auto': isOpen },
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          'flex justify-between transition-all duration-1000 ease-in-out',
          { 'flex-wrap': isOpen },
          { 'translate-y-0': isOpen },
        )}
      >
        {isOpen
          ? React.Children.map(
              children as React.ReactElement[],
              (child, index) =>
                child && (
                  <div
                    key={child.key || index}
                    className="flex w-16 items-center justify-center"
                  >
                    {child}
                  </div>
                ),
            ).concat(
              <div
                key="toggle"
                className="flex w-16 items-center justify-center"
              >
                {toggleButton}
              </div>,
            )
          : visibleButtons.map((child, index) => (
              <div
                key={index}
                className="flex w-16 items-center justify-center"
              >
                {child}
              </div>
            ))}
      </div>
    </div>
  );
};

export default ButtonDrawer;
