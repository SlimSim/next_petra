'use client';

import { SpeachInstruction, Timeout, Workout } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  workoutToSpeachInstructions,
  timeToDisp,
  timeToMinutes,
  timeToMinutesAndSeconds,
} from '@/lib/utils';
import IconButton from '../slimSim/iconButton';
import StartWorkoutButton from './startWorkoutButton';
import { TrashIcon } from 'lucide-react';
import BottomBar from '../slimSim/bottomBar';
import { useWorkout } from './hooks/useWorkout';

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
      <div className="flex shrink-0 flex-col content-start items-start items-end justify-start rounded-lg bg-yellow-500 p-4 md:h-52">
        <p
          className={`place-self-start text-xl text-gray-800 md:text-3xl md:leading-normal`}
        >
          <strong>Welcome to Petra.</strong> Your personal trainer!
        </p>
        <div className="flex flex-wrap place-self-start">
          <p>{currentWorkout?.name} &nbsp; &nbsp;</p>
          <p>{currentWorkout?.type} &nbsp; &nbsp;</p>
          <p>
            {currentWorkout &&
              timeToMinutesAndSeconds(currentWorkoutTimeLeft) +
                '/' +
                timeToDisp(currentWorkout.time)}
          </p>
        </div>
        <div className="flex flex-wrap place-self-start md:text-3xl">
          <p>{currentWorkout && currentIndex + 1 + ':'} &nbsp; </p>
          <p>{currentTimeLeft} &nbsp; &nbsp;</p>
          <p>{currentExercise}</p>
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
