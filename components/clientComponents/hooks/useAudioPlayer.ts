// hooks/useAudioPlayer.ts
import { useState, useEffect, useRef, useCallback } from 'react';

interface AudioPlayerHook {
  play: (url: string) => void;
  pause: () => void;
  seek: (time: number) => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentTrack: string | null;
}

let globalAudio: HTMLAudioElement | null = null;
let globalIsPlaying = false;
let globalCurrentTrack: string | null = null;

export function useAudioPlayer(): AudioPlayerHook {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio();
      globalAudio.volume = 0.2;
      globalAudio.addEventListener('timeupdate', handleTimeUpdate);
      globalAudio.addEventListener('durationchange', handleDurationChange);
      globalAudio.addEventListener('ended', handleEnded);
    }

    return () => {
      if (globalAudio) {
        globalAudio.removeEventListener('timeupdate', handleTimeUpdate);
        globalAudio.removeEventListener('durationchange', handleDurationChange);
        globalAudio.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (globalAudio) {
      setCurrentTime(globalAudio.currentTime);
    }
  }, []);

  const handleDurationChange = useCallback(() => {
    if (globalAudio) {
      setDuration(globalAudio.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    globalIsPlaying = false;
  }, []);

  const play = useCallback((url: string) => {
    if (globalAudio) {
      if (url !== globalCurrentTrack) {
        globalAudio.src = url;
        globalCurrentTrack = url;
      }
      globalAudio.play().then(() => {
        setIsPlaying(true);
        setCurrentTrack(url);
        globalIsPlaying = true;
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (globalAudio) {
      globalAudio.pause();
      setIsPlaying(false);
      globalIsPlaying = false;
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (globalAudio) {
      globalAudio.currentTime = time;
    }
  }, []);

  useEffect(() => {
    setIsPlaying(globalIsPlaying);
    setCurrentTrack(globalCurrentTrack);
  }, [globalIsPlaying, globalCurrentTrack]);

  return { play, pause, seek, isPlaying, currentTime, duration, currentTrack };
}