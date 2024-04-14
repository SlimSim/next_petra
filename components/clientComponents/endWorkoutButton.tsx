'use client';
import React from 'react';
import IconButton from '../slimSim/iconButton';
import { StopIcon } from '@heroicons/react/20/solid';

const handleEndWorkout = () => {

};

interface EndWorkoutBottomProps {
  onEndWorkout: () => void;
}

export const EndWorkoutButton:React.FC<EndWorkoutBottomProps> = ({onEndWorkout}) => {
  return (
    <IconButton
      icon={<StopIcon></StopIcon>}
      onClick={onEndWorkout} >
        Stop
        </IconButton>
  );
};

