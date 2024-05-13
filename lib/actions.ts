'use server';

import { z } from 'zod';
import { getWorkoutTypes, workoutToTime } from './utils';
import { sql } from '@vercel/postgres';
import { WorkoutType } from '@/app/lib/definitions';

const FormSchema = z.object({
  workoutName: z.string(),
  workoutType: z.enum(getWorkoutTypes() as [WorkoutType, ...WorkoutType[]]),
  workoutExercises: z.string(),
});

const CreateWorkout = FormSchema.omit({});

export async function createWorkout(formData: FormData) {

  const rawFormData = Object.fromEntries(formData.entries());
  const {workoutExercises, workoutName, workoutType} = CreateWorkout.parse(rawFormData);
  const createdDate:string = new Date().toISOString().split('T')[0];
  
  const name:string = workoutName;
  const time:number = workoutToTime(workoutType, workoutExercises);
  const type:string = workoutType;
  const exercises:any = workoutExercises.split(',');
  
    const insertedWorkout = await sql`
        INSERT INTO PetraWrokouts (name, time, type, exercises, createddate)
        VALUES (${name}, ${time}, ${type}, ${exercises}, ${createdDate} )
        ON CONFLICT (id) DO NOTHING;
    `;

    return insertedWorkout;
}
