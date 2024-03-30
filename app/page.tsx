import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchWorkouts } from './lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Workout } from './lib/definitions';
import { timeToDisp } from '@/lib/utils';
import StartWorkoutButton from '@/components/clientComponents/startWorkoutButton';
import BottomBar from '@/components/slimSim/bottomBar';
import IconButton from '@/components/slimSim/iconButton';
import { TrashIcon } from 'lucide-react';

/*
const workoutIntervals = {
  // Adjust these intervals based on your desired exercise execution time
  headerDelay: 1000, // 1 second delay before logging the header
  exerciseDelay: 3000, // 3 seconds between logging exercises
};
*/

//let currentWorkoutId: ReturnType<typeof setTimeout> | null = null; // Stores the ID (or key) of the currently running workout

// Define the startWorkout function
export default async function Page() {
  const workouts: Workout[] = await fetchWorkouts();

  return (
    <main className="flex min-h-screen pb-20 flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-yellow-500 p-4 md:h-52">
        <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
          <strong>Welcome to Petra.</strong> Your personal trainer!
        </p>
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
                  <IconButton icon={<TrashIcon />} >Remove</IconButton>
                  <StartWorkoutButton workout={workout} />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      <BottomBar></BottomBar>
    </main>
  );
}
