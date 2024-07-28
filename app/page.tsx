import ClientWrapper from '@/components/clientComponents/clientWrapper';
import { Workout } from './lib/definitions';
import { fetchDefaultWorkouts, fetchWorkouts } from './lib/data';

export default async function Page() {
  const workouts: Workout[] = await fetchDefaultWorkouts();

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 p-6 pb-20">
      <ClientWrapper workouts={workouts}></ClientWrapper>
    </main>
  );
}
