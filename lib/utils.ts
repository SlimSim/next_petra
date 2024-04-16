import { SpeachInstruction, Workout, WorkoutType } from '@/app/lib/definitions';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeToMinutes(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  return hours > 0
    ? `${hours}:${minutes < 10 ? '0' : ''}${minutes}`
    : `${minutes}`;
}

export function timeToDisp(time: number): string {
  return `${timeToMinutes(time)}m`;
}

export function workoutToSpeachInstructions(
  workout: Workout,
): SpeachInstruction[] {
  switch (workout.type) {
    case WorkoutType.Single: {
      return toSingleSpeachInstructions(workout);
    }
    case WorkoutType.Double: {
      return toDoubleSpeachInstructions(workout);
    }
  }
  return [];
}

export function toSingleSpeachInstructions(
  workout: Workout,
): SpeachInstruction[] {
  let si: SpeachInstruction[] = [];
  workout.exercises.forEach((excercise) => {
    si.push({
      name: excercise,
      time: 30,
    });
    si.push({
      name: 'pause',
      time: 10,
    });
  });
  si.pop();

  return si;
}

export function toDoubleSpeachInstructions(
  workout: Workout,
): SpeachInstruction[] {
  let si: SpeachInstruction[] = [];

  const exercises = workout.exercises;
  for (let i = 0; i < exercises.length; i += 2) {
    const currentExercise = exercises[i];
    const nextExercise = exercises[i + 1];

    si.push({ name: currentExercise, time: 45 });
    if (nextExercise) si.push({ name: nextExercise, time: 45 });
    si.push({ name: currentExercise, time: 30 });
    if (nextExercise) si.push({ name: nextExercise, time: 30 });

    si.push({ name: 'pause', time: 15 });
  }

  si.pop();

  return si;
}
