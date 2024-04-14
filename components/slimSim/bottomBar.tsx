import * as React from "react"
import { EndWorkoutButton } from "../clientComponents/endWorkoutButton";
import IconButton from "./iconButton";
import { PlusIcon, UserIcon } from "lucide-react";

interface BottomBarProps {
    onEndWorkout: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({onEndWorkout}) => {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
                <EndWorkoutButton onEndWorkout={onEndWorkout} />
                <IconButton onClick={()=>{console.log("new Workout")}} icon={<PlusIcon></PlusIcon>}>New Workout</IconButton>
                <IconButton onClick={() => {}} icon={<UserIcon></UserIcon>} >Sign In</IconButton>
            </div>
        </div>
    );
};
  
export default BottomBar;