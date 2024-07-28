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
import { StarIcon, TrashIcon } from 'lucide-react';
import BottomBar from '../slimSim/bottomBar';
import { useWorkout } from './hooks/useWorkout';
import HeaderBar from '../slimSim/headerBar';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import usePersistentState from './hooks/usePersistentState';

interface ClientWrapperAllWorkoutsProps {
  workouts: Workout[];
}

const ClientWrapperAllWorkouts: React.FC<ClientWrapperAllWorkoutsProps> = ({
  workouts,
}) => {
  const {
    currentWorkout,
    currentTimeLeft,
    currentWorkoutTimeLeft,
    currentIndex,
    currentExercise,
    startWorkout,
    stopWorkout,
  } = useWorkout();

  const [myWorkouts, setMyWorkouts] = usePersistentState<Workout[]>(
    'myWorkouts',
    [],
  );

  const handleStarClick = (workout: Workout, stared: boolean) => {
    if (stared) {
      setMyWorkouts(myWorkouts.filter((w) => w.id !== workout.id));
    } else {
      setMyWorkouts([...myWorkouts, workout]);
    }
  };

  return (
    <>
      <HeaderBar
        showBottom={false}
        top={
          <>
            <strong>Welcome to Petra.</strong> Your personal trainer!
          </>
        }
        bottom={
          <div className="h-2"></div>
        }
      ></HeaderBar>
      <div className="wrap w-100 grid grid-cols-1 gap-6 rounded-lg py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {workouts.map((workout) => {
          const stared = myWorkouts.some((w) => w.id === workout.id);
          var staredClasses = stared ? 'text-yellow-500 fill-yellow-500' : '';

          return (
            <Card key={workout.name}>
              <CardHeader>
                <CardTitle>
                  {workout.name}
                  <IconButton
                    className="absolute right-0 top-0 m-0 p-3 pt-1"
                    onClick={() => handleStarClick(workout, stared)}
                    icon={<StarIcon className={staredClasses} />}
                  >
                    Star
                  </IconButton>
                </CardTitle>
                <CardDescription>
                  {workout.type}, {timeToDisp(workout.time)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {workout.exercises.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index < workout.exercises.length - 1 &&
                      (index % 2 === 0 ? ', ' : ', ')}
                  </span>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <BottomBar></BottomBar>
    </>
  );
};

export default ClientWrapperAllWorkouts;
