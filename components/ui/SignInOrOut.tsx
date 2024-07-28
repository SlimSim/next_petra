// components/ui/SignInButton.tsx
import React from 'react';
import firebase from '@/app/lib/firebase';
import 'firebase/compat/auth';
import IconButton from '../slimSim/iconButton';
import { LogInIcon, LogOutIcon } from 'lucide-react';
import useAuth from '@/app/lib/useAuth';

const SignInOrOutButton = () => {
  const { user } = useAuth();
  if (user != null) {
    // user is signed in:
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
  }

  // User is not signed in:
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

export default SignInOrOutButton;
