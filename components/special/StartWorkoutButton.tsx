'use client';
import React from 'react';
import { Button } from '../ui/button'; // Import your Button component
import { Workout } from '@/app/lib/definitions';


const workoutIntervals = {
  // Adjust these intervals based on your desired exercise execution time
  headerDelay: 500, // 1 second delay before logging the header
  exerciseDelay: 1000, // 3 seconds between logging exercises
};

let currentTimeout: ReturnType<typeof setTimeout> | null = null; // Stores the ID (or key) of the currently running workout

const sayInstruction = (text:string) => {
  console.log( text);
}


const workoutRun = (currentIndex : number, exercises: string[]) => {


  currentTimeout = setTimeout(() => {
    if(exercises.length <= currentIndex) {
      sayInstruction( "Good work!" )
      return;
    }  

    sayInstruction( exercises[currentIndex] );
    workoutRun(currentIndex+1, exercises);
  }, workoutIntervals.exerciseDelay);
};

const stopCurrentWorkout = () => {
  if (currentTimeout === null) {
    return;
  }
  // Stop the current workout (if any)
  clearTimeout(currentTimeout);
}

const handleStartWorkout = (workout: Workout) => {
  //console.log('handleStartWorkout-> workout: ', workout);
  stopCurrentWorkout();

  sayInstruction( `Lets do the ${workout.name} for ${workout.time / 60} minutes.` )

  let currentIndex = 0;
  workoutRun(currentIndex, workout.exercises);

/*
  const workoutId = setInterval(
    () => {
      console.log(workout.name); // Log the header after a delay
      workout.exercises.forEach((exercise, index) => {
        setTimeout(
          () => console.log(exercise),
          index * workoutIntervals.exerciseDelay,
        );
      });
    },
    workoutIntervals.headerDelay +
      workout.exercises.length * workoutIntervals.exerciseDelay,
  );

  currentWorkoutId = workoutId; // Update the current workout ID
  */
};

interface StartWorkoutButtonProps {
  workout: Workout; // Define the prop type for workout data
}

const StartWorkoutButton: React.FC<StartWorkoutButtonProps> = ({ workout }) => {
  return (
    <Button onClick={() => handleStartWorkout(workout)}>Start workout!</Button>
  );
};

export default StartWorkoutButton;
