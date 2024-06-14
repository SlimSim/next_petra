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
import { timeToDisp, timeToMinutesAndSeconds } from '@/lib/utils';
import IconButton from '../slimSim/iconButton';
import StartWorkoutButton from './startWorkoutButton';
import { TrashIcon } from 'lucide-react';
import BottomBar from '../slimSim/bottomBar';
import { useWorkout } from './hooks/useWorkout';
import HeaderBar from '../slimSim/headerBar';
import usePersistentState from './hooks/usePersistentState';
import HeaderBarX from '../slimSim/headerBarX';
import { EndWorkoutButton } from './endWorkoutButton';

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
      <HeaderBarX
        showBottom={!!currentWorkout}
        top={
          <>
            <strong>Welcome to Petra.</strong> Your personal trainer!
          </>
        }
        bottom={
          <>
            <div className="grow py-2">
              <div className="flex flex-wrap place-self-start">
                <p>{currentWorkout?.name} &nbsp; &nbsp;</p>
                <p>{currentWorkout?.type} &nbsp; &nbsp;</p>
                <p>
                  {currentWorkout &&
                    timeToMinutesAndSeconds(
                      currentTimeLeft as unknown as number,
                    ) +
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
            {currentWorkout && <EndWorkoutButton onEndWorkout={stopWorkout} />}
          </>
        }
      ></HeaderBarX>

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

      <BottomBar></BottomBar>
    </>
  );
};

export default ClientWrapper;
