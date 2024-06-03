'use client';
import { Workout } from '@/app/lib/definitions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { timeToDisp } from '@/lib/utils';
import IconButton from '../slimSim/iconButton';
import { StarIcon } from 'lucide-react';
import BottomBar from '../slimSim/bottomBar';
import { useWorkout } from './hooks/useWorkout';
import HeaderBar from '../slimSim/headerBar';
import useWorkoutClassNames from './hooks/useWorkoutClassNames'; // Import the custom hook

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

  const { classNames, myWorkouts, setMyWorkouts } =
    useWorkoutClassNames(workouts);

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
        workout={currentWorkout}
        index={currentIndex}
        timeLeft={currentTimeLeft}
        exercise={currentExercise}
        workoutTimeLeft={currentWorkoutTimeLeft}
      />
      <div className="wrap w-100 grid grid-cols-1 gap-6 rounded-lg py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {workouts.map((workout) => {
          const stared = myWorkouts.some((w) => w.id === workout.id);
          const classX = workout.id != null ? classNames[workout.id] || '' : '';

          return (
            <Card key={workout.name}>
              <CardHeader>
                <CardTitle>
                  {workout.name}
                  <IconButton
                    className="absolute right-0 top-0 m-0 p-3 pt-1"
                    onClick={() => handleStarClick(workout, stared)}
                    icon={<StarIcon className={classX} />}
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

      <BottomBar onEndWorkout={stopWorkout} />
    </>
  );
};

export default ClientWrapperAllWorkouts;
