import { useState, useEffect } from 'react';
import { SpeachInstruction, Timeout, Workout, WorkoutType } from '@/app/lib/definitions';
import {
  workoutToSpeachInstructions,
  timeToMinutes,
  timeToMinutesAndSeconds,
} from '@/lib/utils';
import { useAudioPlayer } from './useAudioPlayer';
import { useAudioPlayerContext } from '@/contexts/AudioPlayerContext';
import { MUSIC } from '@/lib/constants';

export function useWorkout() {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [currentTimeout, setCurrentTimeout] = useState<Timeout | null>(null);
  const [currentTimeLeft, setCurrentTimeLeft] = useState<string>('');
  const [currentWorkoutTimeLeft, setCurrentWorkoutTimeLeft] =
    useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentExercise, setCurrentExercise] = useState<string>('');
  const { play, pause, isPlaying, currentTrack } = useAudioPlayerContext();

  const startWorkout = (workout: Workout) => {
    console.log("startWorkout ->")
    console.log( "startWorkout:", workout);
    pause();

    // TODO: hur ska jag här kunna stanna musiken som startades från bottomBar???


    stopWorkoutSilently();

    setCurrentWorkout(workout);

    let instructions = workoutToSpeachInstructions(workout);

    console.log("instructions", instructions);


    say(
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
    if( workout.type == WorkoutType.QuickStretch || workout.type == WorkoutType.SeriousStretch ) {
      console.log( "play stretch music" );
      play( MUSIC.STRETCH_MUSIC_PATH );
    } else {
      console.log( "play workout music" );
      play( MUSIC.WORKOUT_MUSIC_PATH );
    }
  };

  const workoutRun = (
    localCurrentIndex: number,
    instructions: SpeachInstruction[],
    localCurrentWorkoutTime: number,
    localCurrentTime?: number,
  ) => {
    if (instructions.length <= localCurrentIndex) {
      stopWorkoutSilently();
      say('Great work!');
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

    if (instructions[localCurrentIndex].name == 'pause') {
      sayPause(
        localCurrentTime,
        totalExcerciseTime,
        instructions[localCurrentIndex].time,
        instructions[localCurrentIndex + 1].name,
      );
    } else {
      sayExcersise(
        localCurrentTime,
        totalExcerciseTime,
        halftime,
        instructions[localCurrentIndex].name,
      );
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
    say('Workout Stopped');
  };

  const stopWorkoutSilently = () => {
    pause();
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

  const sayExcersise = (
    localCurrentTime: number,
    totalExcerciseTime: number,
    halftime: number,
    excersise: string,
  ) => {
    switch (localCurrentTime) {
      case totalExcerciseTime:
        say(`Lets do some ${excersise}`);
        break;
      case halftime:
        say(`Halftime`);
        break;
      case 30:
        say(`30 seconds left`);
        break;
      case 10:
        if (halftime > 14) {
          say(`10`);
        }
        break;
      case 1:
        say(`OK`);
        break;

      default:
        break;
    }
  };

  const sayPause = (
    localCurrentTime: number,
    totalExcerciseTime: number,
    pauseTime: number,
    nextExcersise: string,
  ) => {
    switch (localCurrentTime) {
      case totalExcerciseTime:
        say(
          `Lets pause for ${pauseTime} seconds, then will do some ${nextExcersise}`,
        );
        break;
      case 1:
        say(`OK`);
        break;
      default:
        break;
    }
  };

  const say = (text: string) => {
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
    console.log( "say " + text );
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
