'use client';
import React from 'react';
import { Workout } from '@/app/lib/definitions';
import { Petra } from '@/lib/utils';
import IconButton from '../slimSim/iconButton';
import { PlayIcon } from 'lucide-react';

const handleStartWorkout = (workout: Workout) => {
  Petra.startWorkout(workout);
};

interface StartWorkoutButtonProps {
  workout: Workout; // Define the prop type for workout data
}

const StartWorkoutButton: React.FC<StartWorkoutButtonProps> = ({ workout }) => {
  return (
    <IconButton
      icon={<PlayIcon/>}
      onClick={() => handleStartWorkout(workout)}>
        Start workout!
      </IconButton>
  );
};

export default StartWorkoutButton;
