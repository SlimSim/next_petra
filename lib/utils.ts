import { Workout } from "@/app/lib/definitions";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeToDisp(time:number):string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  return hours > 0 ? `${hours}:${minutes < 10 ? '0' : ''}${minutes}` : `${minutes}m`;
}

export class Petra {

  private static workoutIntervals = {
    // Adjust these intervals based on your desired exercise execution time:
    headerDelay: 500,
    exerciseDelay: 1000,
  };

  private static currentTimeout: ReturnType<typeof setTimeout> | null; // Stores the ID (or key) of the currently running workout
  
  public static startWorkout(workout: Workout) {

    Petra.stopWorkout();

    Petra.sayInstruction( `Lets do the ${workout.name} for ${workout.time / 60} minutes.` )

    let currentIndex = 0;
    Petra.workoutRun(currentIndex, workout.exercises);
  };

  /**
   * workoutRun
   */
  public static stopWorkout() {
    if (this.currentTimeout === null) {
      return;
    }
    // Stop the current workout (if any)

    Petra.sayInstruction( "Workout Stopped" );
    clearTimeout(this.currentTimeout);
  }


  /**
   * sayInstruction
   */
  private static sayInstruction(text:string) {
    console.log( text );
  }

  /**
   * workoutRun
   */
  private static workoutRun(currentIndex : number, exercises: string[]) {
    
    Petra.currentTimeout = setTimeout(() => {
      if(exercises.length <= currentIndex) {
        Petra.sayInstruction( "Good work!" )
        return;
      }

      Petra.sayInstruction( exercises[currentIndex] );
      Petra.workoutRun(currentIndex+1, exercises);
    }, Petra.workoutIntervals.exerciseDelay);
  }

}
