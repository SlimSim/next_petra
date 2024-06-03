import { useEffect, useState } from 'react';
import { Workout } from '@/app/lib/definitions';
import usePersistentState from './usePersistentState';

const useWorkoutClassNames = (workouts: Workout[]) => {
  const [myWorkouts, setMyWorkouts] = usePersistentState<Workout[]>(
    'myWorkouts',
    [],
  );
  const [classNames, setClassNames] = useState<{ [key: string]: string }>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const newClassNames: { [key: string]: string } = {};
      workouts.forEach((workout) => {
        if (workout.id == null) {
          return;
        }
        const stared = myWorkouts.some((w) => w.id === workout.id);
        newClassNames[workout.id] = stared
          ? 'text-yellow-500 fill-yellow-500'
          : '';
      });
      setClassNames(newClassNames);
    }
  }, [workouts, myWorkouts, isMounted]);

  return { classNames, myWorkouts, setMyWorkouts };
};

export default useWorkoutClassNames;
