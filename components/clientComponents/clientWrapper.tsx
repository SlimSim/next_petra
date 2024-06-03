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
import usePersistentState from './hooks/usePersistentState';

interface ClientWrapperProps {
  workouts: Workout[];
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({
  workouts: defaultWorkouts,
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
  if (myWorkouts.length == 0) {
    setMyWorkouts(defaultWorkouts);
  }

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
        {myWorkouts.map((workout) => {
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

      <BottomBar onEndWorkout={stopWorkout}></BottomBar>
    </>
  );
};

export default ClientWrapper;
