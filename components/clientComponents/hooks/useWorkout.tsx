import { useState, useEffect } from 'react';
import { SpeachInstruction, Timeout, Workout } from '@/app/lib/definitions';
import {
  workoutToSpeachInstructions,
  timeToMinutes,
  timeToMinutesAndSeconds,
} from '@/lib/utils';

export function useWorkout() {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [currentTimeout, setCurrentTimeout] = useState<Timeout | null>(null);
  const [currentTimeLeft, setCurrentTimeLeft] = useState<string>('');
  const [currentWorkoutTimeLeft, setCurrentWorkoutTimeLeft] =
    useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentExercise, setCurrentExercise] = useState<string>('');

  const startWorkout = (workout: Workout) => {
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

  return {
    currentWorkout,
    currentTimeLeft,
    currentWorkoutTimeLeft,
    currentIndex,
    currentExercise,
    startWorkout,
    stopWorkout,
  };
}
