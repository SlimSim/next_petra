import * as React from 'react';
import {
  FacebookIcon,
  PlusIcon,
  RedoIcon,
  SearchIcon,
  StarIcon,
} from 'lucide-react';
import IconButtonLink from './iconButtonLink';
import ButtonDrawer from '@/app/ui/ButtonDrawer';
import IconButton from './iconButton';
import SignInOrOutButton from '../ui/SignInOrOut';
import { FaceSmileIcon } from '@heroicons/react/20/solid';

interface ButtomBarProps {
  children?: React.ReactNode;
}
const BottomBar1: React.FC<ButtomBarProps> = ({ children }) => {
  return (
    <ButtonDrawer>
      {children}
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
      <IconButtonLink href="#" icon={<FacebookIcon></FacebookIcon>}>
        Facebook
      </IconButtonLink>
    </ButtonDrawer>
  );
};

export default BottomBar1;
