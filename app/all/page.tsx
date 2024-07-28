import { Workout } from '../lib/definitions';
import { fetchWorkouts } from '../lib/data';
import ClientWrapperAllWorkouts from '@/components/clientComponents/clientWrapperAllWorkouts';

export default async function Page() {
  const workouts: Workout[] = await fetchWorkouts();
  return (
    <main className="flex min-h-screen flex-col bg-gray-50 p-6 pb-20">
      <ClientWrapperAllWorkouts workouts={workouts}></ClientWrapperAllWorkouts>;
    </main>
  );
}
