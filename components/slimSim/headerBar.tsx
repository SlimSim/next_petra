import * as React from 'react';
import { cn, timeToDisp, timeToMinutesAndSeconds } from '@/lib/utils';
import { Workout } from '@/app/lib/definitions';
import { EndWorkoutButton } from '../clientComponents/endWorkoutButton';

interface HeaderBarProps {
  workout: Workout | null;
  index: number;
  timeLeft: string;
  exercise: string;
  workoutTimeLeft: number;
  onEndWorkout: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  workout,
  index,
  timeLeft,
  exercise,
  workoutTimeLeft,
  onEndWorkout,
}) => {
  return (
    <>
      <div
        className={cn(
          `sticky -top-2 flex shrink-0 flex-col content-start items-start justify-start rounded-t-lg bg-yellow-500 p-4 pb-0 md:h-20`,
          { 'z-20': !workout },
        )}
      >
        <p
          className={`place-self-start text-xl text-gray-800 md:text-3xl md:leading-normal`}
        >
          <strong>Welcome to Petra.</strong> Your personal trainer!
        </p>
      </div>
      <div className="sticky top-0 z-10 flex shrink-0 flex-row content-start items-center rounded-b-lg bg-yellow-500 p-0 pl-4 align-middle shadow-md md:h-32">
        <div className="grow py-2">
          <div className="flex flex-wrap place-self-start">
            <p>{workout?.name} &nbsp; &nbsp;</p>
            <p>{workout?.type} &nbsp; &nbsp;</p>
            <p>
              {workout &&
                timeToMinutesAndSeconds(workoutTimeLeft) +
                  '/' +
                  timeToDisp(workout.time)}
            </p>
          </div>
          <div className="flex flex-wrap place-self-start md:text-3xl">
            <p>{workout && index + 1 + ':'} &nbsp; </p>
            <p>{timeLeft} &nbsp; &nbsp;</p>
            <p>{exercise}</p>
          </div>
        </div>
        {workout && <EndWorkoutButton onEndWorkout={onEndWorkout} />}
      </div>
    </>
  );
};

export default HeaderBar;
