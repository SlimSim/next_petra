'use client';

import { Workout } from '@/app/lib/definitions';
import { toast, Toaster } from 'sonner';
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
import {
  Loader2Icon,
  LoaderIcon,
  Redo,
  Redo2Icon,
  RedoIcon,
  Repeat,
  Repeat1Icon,
  RepeatIcon,
  ReplaceIcon,
  RewindIcon,
  StarIcon,
  TestTubeIcon,
  TrashIcon,
  TvIcon,
} from 'lucide-react';
import BottomBar from '../slimSim/bottomBar';
import { useWorkout } from './hooks/useWorkout';
import HeaderBar from '../slimSim/headerBar';
import usePersistentState from './hooks/usePersistentState';
import { EndWorkoutButton } from './endWorkoutButton';
import useAuth from '@/app/lib/useAuth';
import ProfileButton from '../ui/ProfileButton';
import Popover from '../ui/popover';

import SignOutButton from '../ui/SignOutButton';

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

  const { user } = useAuth();

  const [myWorkouts, setMyWorkouts] = usePersistentState<Workout[]>(
    'myWorkouts',
    [],
  );
  if (myWorkouts.length == 0) {
    setMyWorkouts(defaultWorkouts);
  }

  const unstarWorkout = (workout: Workout) => {
    const filterdWorkouts = myWorkouts.filter((w) => w.id !== workout.id);
    setMyWorkouts(filterdWorkouts);
    toast(`Workout "${workout.name}" have been un-stared`, {
    description: `You can find it, and other, in the "all"-section`,
      action: {
        label: "Undo",
        onClick: () => 
          setMyWorkouts([...filterdWorkouts, workout]),
      },
    });
  };

  return (
    <>
      <HeaderBar
        showBottom={!!currentWorkout}
        top={
          <>
            <div className="grow">
              <div className="flex flex-wrap place-self-start">
                <strong className='pr-2'>Welcome to Petra.</strong> Your personal trainer!
              </div>
            </div>

            {user && (
              <Popover
                className="-mr-4 -mt-4"
                position="bottom-right"
                content={
                  <div className="flex flex-row">
                    <SignOutButton></SignOutButton>
                    <IconButton
                      icon={<RedoIcon></RedoIcon>}
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Reload
                    </IconButton>
                  </div>
                }
              >
                <ProfileButton className="" />
              </Popover>
            )}
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
          </>
        }
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
                <IconButton onClick={() => {unstarWorkout(workout)}} icon={<StarIcon />}>
                  Unstar
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

      <BottomBar>
        {currentWorkout && <EndWorkoutButton onEndWorkout={stopWorkout} />}
      </BottomBar>
    </>
  );
};

export default ClientWrapper;
