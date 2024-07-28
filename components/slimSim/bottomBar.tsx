import * as React from 'react';
import {
  FacebookIcon,
  Music4Icon,
  MusicIcon,
  PlusIcon,
  RedoIcon,
  SearchIcon,
  StarIcon,
} from 'lucide-react';
import IconButtonLink from './iconButtonLink';
import ButtonDrawer from '@/app/ui/ButtonDrawer';
import IconButton from './iconButton';
import SignInOrOutButton from '../ui/SignInOrOut';
import { StopIcon } from '@heroicons/react/20/solid';
import { useAudioPlayer } from '../clientComponents/hooks/useAudioPlayer';
import { useAudioPlayerContext } from '@/contexts/AudioPlayerContext';
import { MUSIC } from '@/lib/constants';

interface ButtomBarProps {
  children?: React.ReactNode;
}
const BottomBar1: React.FC<ButtomBarProps> = ({ children }) => {
  const { play, pause, isPlaying, currentTrack } = useAudioPlayerContext();

  const playStretchMusic = () => {
    pause();
    play( MUSIC.STRETCH_MUSIC_PATH );
  }

  const playWorkoutMusic = () => {
    pause();
    play( MUSIC.WORKOUT_MUSIC_PATH );
  }

  return (
    <ButtonDrawer>
      {children}
      <IconButtonLink href="/" icon={<StarIcon></StarIcon>}>
        Stared
      </IconButtonLink>
      {isPlaying && currentTrack == MUSIC.STRETCH_MUSIC_PATH ?
      <IconButton onClick={pause} icon={<StopIcon />} >
        Stop music
      </IconButton>
      : 
      <IconButton onClick={playStretchMusic} icon={<MusicIcon />} >
        Stretch music
      </IconButton>}

      {isPlaying && currentTrack == MUSIC.WORKOUT_MUSIC_PATH ?
      <IconButton onClick={pause} icon={<StopIcon />} >
        Stop music
      </IconButton>
      :
      <IconButton onClick={playWorkoutMusic} icon={<Music4Icon />} >
        Workout music
      </IconButton>}

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
