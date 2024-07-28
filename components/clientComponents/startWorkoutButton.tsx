'use client';
import React from 'react';
import IconButton from '../slimSim/iconButton';
import { PlayIcon } from 'lucide-react';

interface StartWorkoutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onStartWorkout: () => void;
}

const StartWorkoutButton: React.FC<StartWorkoutButtonProps> = ({
  onStartWorkout,
}) => {
  return (
    <IconButton icon={<PlayIcon />} onClick={onStartWorkout}>
      Start workout!
    </IconButton>
  );
};

export default StartWorkoutButton;
