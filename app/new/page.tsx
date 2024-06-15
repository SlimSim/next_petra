import { getWorkoutTypes } from '@/lib/utils';
import { CustomerField, WorkoutType } from '../lib/definitions';
import Form from '../ui/workouts/create-form';
import HeaderBar from '@/components/slimSim/headerBar';

export default async function Page() {
  var workoutTypes = getWorkoutTypes();
  var x: CustomerField[] = [];

  workoutTypes.forEach((key, index) => {
    x.push({ name: key, id: index.toString() });
  });

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 p-6 pb-20">
      <HeaderBar
        showBottom={false}
        top={
          <>
            <strong>Welcome to Petra.</strong> Your personal trainer!
            <br />
            Let&apos;s create a new workout!
          </>
        }
        bottom={<div className="h-2"></div>}
      ></HeaderBar>
      <Form workoutTypes={workoutTypes} />
    </main>
  );
}
