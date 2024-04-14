'use client';

import { Timeout, Workout } from '@/app/lib/definitions';
import React, { useState } from 'react';
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
import { Button } from '../ui/button';

interface ClientWrapperProps {
  workouts: Workout[];
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({workouts}) => {

  const workoutIntervals = {
    // Adjust these intervals based on your desired exercise execution time:
    headerDelay: 500,
    exerciseDelay: 1000,
  };

  let [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  let [currentTimeout, setCurrentTimeout] = useState<Timeout | null>(null);

  const handleStartWorkout = (workout: Workout) => {
    stopWorkout();
    setCurrentWorkout(workout);


    sayInstruction(
      `Lets do the ${workout.name} for ${workout.time / 60} minutes.`,
    );

    let currentIndex = 0;
    workoutRun(currentIndex, workout.exercises);
  };

  const stopWorkout = () => {
    if (currentTimeout === null) {
      return;
    }
    // Stop the current workout (if any)

    sayInstruction('Workout Stopped');
    clearTimeout(currentTimeout);
    setCurrentWorkout(null);
    setCurrentTimeout(null);
  };

  const sayInstruction = (text: string) => {
    console.log(text);
  };

  const workoutRun = (currentIndex: number, exercises: string[]) => {
    setCurrentTimeout(setTimeout(() => {
      if (exercises.length <= currentIndex) {
        sayInstruction('Good work!');
        return;
      }

      sayInstruction(exercises[currentIndex]);
      workoutRun(currentIndex + 1, exercises);
    }, workoutIntervals.exerciseDelay));
  };

  return (
    <>
      <div className="flex justify-start content-start items-start flex-col shrink-0 items-end rounded-lg bg-yellow-500 p-4 md:h-52">
        <p className={`place-self-start text-xl text-gray-800 md:text-3xl md:leading-normal`}>
          <strong>Welcome to Petra.</strong> Your personal trainer!
        </p>
      <div className="place-self-start flex flex-wrap">
        <p>{currentWorkout?.name} &nbsp; &nbsp;</p>
        <p>{currentWorkout?.type} &nbsp; &nbsp;</p>
        <p>{currentWorkout && timeToDisp(currentWorkout.time)}</p>
      </div>
      </div>
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
                      handleStartWorkout(workout);
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
