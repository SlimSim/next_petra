import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { workouts } from './lib/placeholder-data';
import { Workout } from './lib/definitions';
import { timeToDisp } from '@/lib/utils';


export default function Page() {
  console.log("workouts hej");
  console.error( "knas!");

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-yellow-500 p-4 md:h-52">
        {/* <AcmeLogo /> */}
        <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
          <strong>Welcome to Petra.</strong> Your personal trainer!
        </p>
      </div>
      <div className="mt-1 flex grow flex-col gap-4 md:flex-row">
        <div className="wrap flex flex-row flex- w-100 wrap justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:px-20">
          { workouts.map((workout) => {
            return (
              <Card>
                <CardHeader>
                  <CardTitle>{workout.name}</CardTitle>
                  <CardDescription>{workout.type}, {timeToDisp(workout.time)} </CardDescription>
                </CardHeader>
                <CardContent>
                  {
                  workout.excercises.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index < workout.excercises.length - 1 && (index % 2 === 0 ? ", " : ",\n")}
                    </span>
                  ))
                  }
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Remove</Button>
                  <Button>Start workout!</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
      <Link
        href="/login"
        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >
        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </main>
  );
}
