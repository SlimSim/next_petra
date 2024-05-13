import * as React from 'react';
import { timeToDisp, timeToMinutesAndSeconds } from '@/lib/utils';
import { Workout } from '@/app/lib/definitions';

interface HeaderBarProps {
  workout: Workout | null;
  index: number;
  timeLeft: string;
  exercise: string;
  workoutTimeLeft: number;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  workout,
  index,
  timeLeft,
  exercise,
  workoutTimeLeft,
}) => {
  return (
    <div className="flex shrink-0 flex-col content-start items-start justify-start rounded-lg bg-yellow-500 p-4 md:h-52">
      <p
        className={`place-self-start text-xl text-gray-800 md:text-3xl md:leading-normal`}
      >
        <strong>Welcome to Petra.</strong> Your personal trainer!
      </p>
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
  );
};

export default HeaderBar;
