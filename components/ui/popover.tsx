import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

type Position =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'left-center'
  | 'left-top'
  | 'left-bottom'
  | 'right-center'
  | 'right-top'
  | 'right-bottom';

interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  trigger?: 'click' | 'hover';
  position?: Position;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  className,
  trigger = 'click',
  position = 'bottom-center',
}) => {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => {
    if (trigger === 'hover') setShow(true);
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') setShow(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [show, wrapperRef]);

  useEffect(() => {
    if (show && contentRef.current && wrapperRef.current) {
      const { width: triggerWidth, height: triggerHeight } =
        wrapperRef.current.getBoundingClientRect();
      const { width: contentWidth, height: contentHeight } =
        contentRef.current.getBoundingClientRect();

      const distanceFromTrigger = 5;

      let top = 0,
        left = 0;

      switch (position) {
        case 'bottom-center':
          top = triggerHeight + distanceFromTrigger;
          left = (triggerWidth - contentWidth) / 2;
          break;
        case 'bottom-left':
          top = triggerHeight + distanceFromTrigger;
          left = 0;
          break;
        case 'bottom-right':
          top = triggerHeight + distanceFromTrigger;
          left = triggerWidth - contentWidth;
          break;
        case 'top-center':
          top = -contentHeight - distanceFromTrigger;
          left = (triggerWidth - contentWidth) / 2;
          break;
        case 'top-left':
          top = -contentHeight - distanceFromTrigger;
          left = 0;
          break;
        case 'top-right':
          top = -contentHeight - distanceFromTrigger;
          left = triggerWidth - contentWidth;
          break;
        case 'left-center':
          top = (triggerHeight - contentHeight) / 2;
          left = -contentWidth - distanceFromTrigger;
          break;
        case 'left-top':
          top = 0;
          left = -contentWidth - distanceFromTrigger;
          break;
        case 'left-bottom':
          top = triggerHeight - contentHeight;
          left = -contentWidth - distanceFromTrigger;
          break;
        case 'right-center':
          top = (triggerHeight - contentHeight) / 2;
          left = triggerWidth + distanceFromTrigger;
          break;
        case 'right-top':
          top = 0;
          left = triggerWidth + distanceFromTrigger;
          break;
        case 'right-bottom':
          top = triggerHeight - contentHeight;
          left = triggerWidth + distanceFromTrigger;
          break;
      }

      contentRef.current.style.top = `${top}px`;
      contentRef.current.style.left = `${left}px`;
    }
  }, [show, position]);

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={cn('relative inline-block', className)}
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        ref={contentRef}
        hidden={!show}
        className="absolute z-50 min-w-fit transition-all"
      >
        <div className="rounded bg-white p-3 shadow-[5px_5px_10px_rgba(46,38,92,0.25)]">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Popover;
