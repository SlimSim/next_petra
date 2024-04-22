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
  timeToMinutesAndSeconds,
} from '@/lib/utils';
import IconButton from '../slimSim/iconButton';
import StartWorkoutButton from './startWorkoutButton';
import { TrashIcon } from 'lucide-react';
import BottomBar from '../slimSim/bottomBar';

interface ClientWrapperProps {
  workouts: Workout[];
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ workouts }) => {
  let [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  let [currentTimeout, setCurrentTimeout] = useState<Timeout | null>(null);
  let [currentTimeLeft, setCurrentTimeLeft] = useState<string>('');
  let [currentWorkoutTimeLeft, setCurrentWorkoutTimeLeft] = useState<number>(0);
  let [currentIndex, setCurrentIndex] = useState<number>(0);
  let [currentExercise, setCurrentExercise] = useState<string>('');

  const handleStartWorkout = (workout: Workout) => {
    stopWorkoutSilently();
    setCurrentWorkout(workout);

    let instructions = workoutToSpeachInstructions(workout);

    sayInstruction(
      `Lets do the ${workout.name} for ${timeToMinutes(
        workout.time,
      )} minutes, we start with ${instructions[0].name}.`,
    );

    setCurrentIndex(0);
    setCurrentWorkoutTimeLeft(workout.time);
    setCurrentExercise(instructions[0].name);
    setCurrentTimeLeft(timeToMinutesAndSeconds(instructions[0].time));
    setCurrentTimeout(
      setTimeout(() => {
        workoutRun(currentIndex, instructions, workout.time);
      }, 5000),
    );
  };

  const workoutRun = (
    localCurrentIndex: number,
    instructions: SpeachInstruction[],
    localCurrentWorkoutTime: number,
    localCurrentTime?: number,
  ) => {
    if (instructions.length <= localCurrentIndex) {
      stopWorkoutSilently();
      sayInstruction('Great work!');
      return;
    }

    const totalExcerciseTime = instructions[localCurrentIndex].time;
    localCurrentTime =
      localCurrentTime == null ? totalExcerciseTime : localCurrentTime;

    setCurrentIndex(localCurrentIndex);
    setCurrentWorkoutTimeLeft(localCurrentWorkoutTime);
    setCurrentExercise(instructions[localCurrentIndex].name);
    setCurrentTimeLeft(timeToMinutesAndSeconds(localCurrentTime));

    const halftime = Math.ceil(totalExcerciseTime / 2);

    switch (localCurrentTime) {
      case totalExcerciseTime:
        sayInstruction(`Lets do some ${instructions[localCurrentIndex].name}`);
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

    const nextTime = localCurrentTime - 1;
    const nextWorkoutTime = localCurrentWorkoutTime - 1;
    setCurrentTimeout(
      setTimeout(() => {
        if (nextTime <= 0) {
          const nextIndex = localCurrentIndex + 1;
          workoutRun(nextIndex, instructions, nextWorkoutTime);
        } else {
          workoutRun(
            localCurrentIndex,
            instructions,
            nextWorkoutTime,
            nextTime,
          );
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
    speechSynthesis.cancel();
    setCurrentTimeLeft('');
    setCurrentIndex(0);
    setCurrentExercise('');
    setCurrentWorkout(null);
    setCurrentTimeout(null);

    if (currentTimeout != null) {
      clearTimeout(currentTimeout);
    }
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
          <p>
            {currentWorkout &&
              timeToMinutesAndSeconds(currentWorkoutTimeLeft) +
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
