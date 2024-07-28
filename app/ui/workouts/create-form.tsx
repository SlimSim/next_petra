import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { createWorkout } from '@/lib/actions';

export default function Form({
  workoutTypes: workoutTypes,
}: {
  workoutTypes: string[];
}) {
  return (
    <form action={createWorkout}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Workout name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Workout name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="workoutName"
                name="workoutName"
                type="text"
                placeholder="Workout Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Workout type */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Workout type
          </label>
          <div className="relative">
            <select
              id="type"
              name="workoutType"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm  outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a workout type
              </option>
              {workoutTypes.map((workoutType) => (
                <option key={workoutType} value={workoutType}>
                  {workoutType}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Workout Exercises */}
        <fieldset>
          <legend className="mb-0 block text-sm font-medium">
            Workout Exercises
          </legend>
          <p className="pb-2 pt-0 text-sm">
            <i></i>
          </p>
          <div className="rounded-md">
            <textarea
              id="workoutExercises"
              name="workoutExercises"
              placeholder={
                'Write a comma separated list of exercises like: \nPush ups, Back extenssions, Crunches, Jump squats'
              }
              className="w-full border border-gray-300 bg-white p-2 "
            />
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Workout</Button>
      </div>
    </form>
  );
}
