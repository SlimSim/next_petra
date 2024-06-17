// components/ui/SignInButton.tsx
import React from 'react';
import firebase from '@/app/lib/firebase';
import 'firebase/compat/auth';
import IconButton from '../slimSim/iconButton';
import { LogInIcon } from 'lucide-react';

const SignInButton = () => {
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <IconButton icon={<LogInIcon></LogInIcon>} onClick={signInWithGoogle}>
      Sign in
    </IconButton>
  );
};

export default SignInButton;
