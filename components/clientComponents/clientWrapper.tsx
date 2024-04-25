'use client';

import { Workout } from '@/app/lib/definitions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { timeToDisp } from '@/lib/utils';
import IconButton from '../slimSim/iconButton';
import StartWorkoutButton from './startWorkoutButton';
import { TrashIcon } from 'lucide-react';
import BottomBar from '../slimSim/bottomBar';
import { useWorkout } from './hooks/useWorkout';
import HeaderBar from '../slimSim/headerBar';

interface ClientWrapperProps {
  workouts: Workout[];
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ workouts }) => {
  const {
    currentWorkout,
    currentTimeLeft,
    currentWorkoutTimeLeft,
    currentIndex,
    currentExercise,
    startWorkout,
    stopWorkout,
  } = useWorkout();
  return (
    <>
      <HeaderBar
        workout={currentWorkout}
        index={currentIndex}
        timeLeft={currentTimeLeft}
        exercise={currentExercise}
        workoutTimeLeft={currentWorkoutTimeLeft}
      ></HeaderBar>
      <div className="mt-1 flex grow flex-col gap-4 md:flex-row">
        <div className="wrap flex- w-100 wrap flex flex-row justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:px-20">
          {workouts.map((workout) => {
            return (
              <Card key={workout.name}>
                <CardHeader>
                  <CardTitle>{workout.name}</CardTitle>
                  <CardDescription>
                    {workout.type}, {timeToDisp(workout.time)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {workout.exercises.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index < workout.exercises.length - 1 &&
                        (index % 2 === 0 ? ', ' : ',\n')}
                    </span>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <IconButton onClick={() => {}} icon={<TrashIcon />}>
                    Remove
                  </IconButton>
                  <StartWorkoutButton
                    onStartWorkout={() => {
                      startWorkout(workout);
                    }}
                  />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      <BottomBar onEndWorkout={stopWorkout}></BottomBar>
    </>
  );
};

export default ClientWrapper;
