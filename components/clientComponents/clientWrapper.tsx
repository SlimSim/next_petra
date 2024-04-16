'use client';

import { SpeachInstruction, Timeout, Workout } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  workoutToSpeachInstructions,
  timeToDisp,
  timeToMinutes,
} from '@/lib/utils';
import IconButton from '../slimSim/iconButton';
import StartWorkoutButton from './startWorkoutButton';
import { TrashIcon } from 'lucide-react';
import BottomBar from '../slimSim/bottomBar';

interface ClientWrapperProps {
  workouts: Workout[];
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ workouts }) => {
  const workoutIntervals = {
    // Adjust these intervals based on your desired exercise execution time:
    headerDelay: 4000,
    exerciseDelay: 30000,
  };

  let [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  let [currentTimeout, setCurrentTimeout] = useState<Timeout | null>(null);

  const handleStartWorkout = (workout: Workout) => {
    stopWorkoutSilently();
    setCurrentWorkout(workout);

    let currentIndex = 0;
    let instructions = workoutToSpeachInstructions(workout);

    sayInstruction(
      `Lets do the ${workout.name} for ${timeToMinutes(
        workout.time,
      )} minutes, we start with ${instructions[0].name}.`,
    );
    setCurrentTimeout(
      setTimeout(() => {
        workoutRun(currentIndex, instructions);
      }, 5000),
    );
  };

  const workoutRun = (
    currentIndex: number,
    instructions: SpeachInstruction[],
    currentTime?: number,
  ) => {
    setCurrentTimeout(
      setTimeout(() => {
        if (instructions.length <= currentIndex) {
          stopWorkoutSilently();
          sayInstruction('Great work!');
          return;
        }
        const totalExcerciseTime = instructions[currentIndex].time;
        currentTime = currentTime == null ? totalExcerciseTime : currentTime;

        const halftime = Math.ceil(totalExcerciseTime / 2);

        switch (currentTime) {
          case totalExcerciseTime:
            sayInstruction(`Lets do some ${instructions[currentIndex].name}`);
            break;
          case halftime:
            sayInstruction(`Halftime`);
            break;
          case 30:
            sayInstruction(`30 seconds left`);
            break;
          case 10:
            if (halftime > 14) {
              sayInstruction(`10`);
            }
            break;
          case 0:
            sayInstruction(`OK`);
            break;

          default:
            break;
        }

        //sayInstruction(instructions[currentIndex].name);

        const nextTime = currentTime - 1;
        if (nextTime < 0) {
          workoutRun(currentIndex + 1, instructions);
        } else {
          workoutRun(currentIndex, instructions, nextTime);
        }
      }, 1000),
    );
  };

  const stopWorkout = () => {
    if (currentTimeout === null) {
      return;
    }
    stopWorkoutSilently();
    sayInstruction('Workout Stopped');
  };

  const stopWorkoutSilently = () => {
    if (currentTimeout === null) {
      return;
    }

    speechSynthesis.cancel();
    clearTimeout(currentTimeout);
    setCurrentWorkout(null);
    setCurrentTimeout(null);
  };

  const preparePetra = () => {
    if (!('speechSynthesis' in window)) {
      console.warn('no speechSynthesis, Petra will be silent :(');
      return;
    }
    speechSynthesis.getVoices();
  };

  const sayInstruction = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported by this browser.');
      return;
    }
    const voices = speechSynthesis.getVoices();

    const googleVoice = voices.find(
      (voice) => voice.name === 'Google US English',
    );

    const utterance = new SpeechSynthesisUtterance(text);
    if (googleVoice) {
      utterance.voice = googleVoice;
    } else {
      console.error('Google US English voice not found.');
    }
    speechSynthesis.speak(utterance);
  };

  useEffect(preparePetra, []);

  return (
    <>
      <div className="flex shrink-0 flex-col content-start items-start items-end justify-start rounded-lg bg-yellow-500 p-4 md:h-52">
        <p
          className={`place-self-start text-xl text-gray-800 md:text-3xl md:leading-normal`}
        >
          <strong>Welcome to Petra.</strong> Your personal trainer!
        </p>
        <div className="flex flex-wrap place-self-start">
          <p>{currentWorkout?.name} &nbsp; &nbsp;</p>
          <p>{currentWorkout?.type} &nbsp; &nbsp;</p>
          <p>{currentWorkout && timeToDisp(currentWorkout.time)}</p>
        </div>
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
                  <IconButton onClick={() => {}} icon={<TrashIcon />}>
                    Remove
                  </IconButton>
                  <StartWorkoutButton
                    onStartWorkout={() => {
                      handleStartWorkout(workout);
                    }}
                  />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      <BottomBar onEndWorkout={stopWorkout}></BottomBar>
    </>
  );
};

export default ClientWrapper;
