import * as React from 'react';
import { cn, timeToDisp, timeToMinutesAndSeconds } from '@/lib/utils';
import { Workout } from '@/app/lib/definitions';
import { EndWorkoutButton } from '../clientComponents/endWorkoutButton';
import { ReactElement } from 'react';

/*
Här vill jag fixa så att stylen för headerBaren finns

och så finns det två children, en för top-part, och en för bottom-part
så kan play-sidan använda dom och toggla vilken som synns beroende på vad som spelas

och så kan new-sidan bara visa en enkel Welcome to petra, lets create a new workout!
*/

interface HeaderBarProps {
  top: ReactElement<any, any>;
  bottom: ReactElement<any, any>;
  showBottom: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ top, bottom, showBottom }) => {
  return (
    <>
      <div
        className={cn(
          `sticky -top-2 z-20 flex shrink-0 flex-col content-start items-start justify-start rounded-t-lg bg-yellow-500 p-4 pb-0 md:h-20`,
          { 'z-30': !showBottom },
        )}
      >
        <p
          className={`place-self-start text-xl text-gray-800 md:text-3xl md:leading-normal`}
        >
          {top}
        </p>
      </div>
      <div className="sticky top-0 z-20 flex shrink-0 flex-row content-start items-center rounded-b-lg bg-yellow-500 p-0 pl-4 align-middle shadow-md md:h-32">
        {bottom}
      </div>
    </>
  );
};

export default HeaderBar;
