'use client';
import React from 'react';
import IconButton from '../slimSim/iconButton';
import { StopIcon } from '@heroicons/react/20/solid';
import { cn } from '@/lib/utils';

interface EndWorkoutBottomProps {
  onEndWorkout: () => void;
  className?: string;
}

export const EndWorkoutButton: React.FC<EndWorkoutBottomProps> = ({
  onEndWorkout,
  className,
}) => {
  return (
    <IconButton
      icon={<StopIcon></StopIcon>}
      onClick={onEndWorkout}
      className={cn(className)}
    >
      Stop
    </IconButton>
  );
};
