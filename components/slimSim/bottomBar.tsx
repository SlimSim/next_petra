import * as React from 'react';
import { PlusIcon, RedoIcon, SearchIcon, StarIcon } from 'lucide-react';
import IconButtonLink from './iconButtonLink';
import ButtonDrawer from '@/app/ui/ButtonDrawer';
import IconButton from './iconButton';
import SignInOrOutButton from '../ui/SignInOrOut';

const BottomBar1: React.FC = () => {
  return (
    <ButtonDrawer>
      <IconButtonLink href="/" icon={<StarIcon></StarIcon>}>
        Stared
      </IconButtonLink>
      <IconButtonLink href="/new" icon={<PlusIcon></PlusIcon>}>
        New
      </IconButtonLink>
      <IconButtonLink href="/all" icon={<SearchIcon></SearchIcon>}>
        All
      </IconButtonLink>
      <SignInOrOutButton />
      <IconButton
        icon={<RedoIcon></RedoIcon>}
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload
      </IconButton>
    </ButtonDrawer>
  );
};

export default BottomBar1;
