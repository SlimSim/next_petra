import * as React from 'react';
import { EndWorkoutButton } from '../clientComponents/endWorkoutButton';
import IconButton from './iconButton';
import { PlusIcon, SearchIcon, StarIcon, UserIcon } from 'lucide-react';
import IconButtonLink from './iconButtonLink';

const BottomBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
      <div className="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
        <IconButtonLink href="/" icon={<StarIcon></StarIcon>}>
          Stared
        </IconButtonLink>
        <IconButtonLink href="/new" icon={<PlusIcon></PlusIcon>}>
          New
        </IconButtonLink>
        <IconButtonLink href="/all" icon={<SearchIcon></SearchIcon>}>
          All
        </IconButtonLink>
        {/*<IconButton onClick={() => {}} icon={<UserIcon></UserIcon>}>
            Sign In
    </IconButton>*/}
      </div>
    </div>
  );
};

export default BottomBar;
