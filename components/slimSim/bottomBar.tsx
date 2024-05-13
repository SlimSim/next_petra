import * as React from "react"
import { EndWorkoutButton } from "../clientComponents/endWorkoutButton";
import IconButton from "./iconButton";
import { PlusIcon, UserIcon } from "lucide-react";
import IconButtonLink from './iconButtonLink';

interface BottomBarProps {
    onEndWorkout: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({onEndWorkout}) => {
    return (
      <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
          <EndWorkoutButton onEndWorkout={onEndWorkout} />
          <IconButtonLink href="/new" icon={<PlusIcon></PlusIcon>}>
            New Workout
          </IconButtonLink>
          <IconButton onClick={() => {}} icon={<UserIcon></UserIcon>}>
            Sign In
          </IconButton>
        </div>
      </div>
    );
};
  
export default BottomBar;