// components/ui/SignOutButton.tsx
import React from 'react';
import firebase from '@/app/lib/firebase';
import IconButton from '../slimSim/iconButton';
import { LogOutIcon } from 'lucide-react';

const SignOutButton = () => {
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <IconButton icon={<LogOutIcon />} onClick={signOut}>
      Sign out
    </IconButton>
  );
};

export default SignOutButton;
