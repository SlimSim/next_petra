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
import { StarIcon, TrashIcon } from 'lucide-react';
import BottomBar from '../slimSim/bottomBar';
import { useWorkout } from './hooks/useWorkout';
import HeaderBar from '../slimSim/headerBar';
import { Button } from '../ui/button';

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
  return (
    <>
      <HeaderBar
        workout={currentWorkout}
        index={currentIndex}
        timeLeft={currentTimeLeft}
        exercise={currentExercise}
        workoutTimeLeft={currentWorkoutTimeLeft}
      ></HeaderBar>
      <div className="wrap w-100 grid grid-cols-1 gap-6 rounded-lg py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {workouts.map((workout) => {
          return (
            <Card key={workout.name}>
              <CardHeader>
                <CardTitle>
                  {workout.name}
                  <IconButton
                    className="absolute right-0 top-0 m-0 p-3 pt-1"
                    onClick={() => {
                      console.log('Star clicked!');
                    }}
                    icon={<StarIcon className="fill-black" />}
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
                      (index % 2 === 0 ? ', ' : ',\n')}
                  </span>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <BottomBar onEndWorkout={stopWorkout}></BottomBar>
    </>
  );
};

export default ClientWrapperAllWorkouts;
