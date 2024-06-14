import { getWorkoutTypes } from '@/lib/utils';
import { CustomerField, WorkoutType } from '../lib/definitions';
import Form from '../ui/workouts/create-form';
import HeaderBarX from '@/components/slimSim/headerBarX';

export default async function Page() {
  async function create(formData: FormData) {
    'use server';

    // Logic to mutate data...
  }

  var workoutTypes = getWorkoutTypes();
  console.log('getWorkoutTypes', workoutTypes);
  var x: CustomerField[] = [];

  workoutTypes.forEach((key, index) => {
    x.push({ name: key, id: index.toString() });
  });

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 p-6 pb-20">
      <HeaderBarX
        showBottom={false}
        top={
          <>
            <strong>Welcome to Petra.</strong> Your personal trainer!
            <br />Let's create a new workout!
          </>
        }
        bottom={
          <div className="h-2"></div>
        }
      ></HeaderBarX>
      <Form workoutTypes={workoutTypes} />
    </main>
  );
}
