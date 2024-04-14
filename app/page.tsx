import ClientWrapper from '@/components/clientComponents/clientWrapper';
import { Workout } from './lib/definitions';
import { fetchWorkouts } from './lib/data';

export default async function Page() {
  const workouts: Workout[] = await fetchWorkouts();

  return (
    <main className="flex min-h-screen pb-20 flex-col p-6">
      <ClientWrapper workouts={workouts}></ClientWrapper>
    </main>
  );
}
