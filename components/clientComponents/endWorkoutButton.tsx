'use client';
import React from 'react';
import { Petra } from '@/lib/utils';
import IconButton from '../slimSim/iconButton';
import { StopIcon } from '@heroicons/react/20/solid';

const handleEndWorkout = () => {
  Petra.stopWorkout();
};

export const EndWorkoutButton = () => {
  return (
    <IconButton
      icon={<StopIcon></StopIcon>}
      onClick={() => handleEndWorkout()} >
        Stop
        </IconButton>
  );
};

