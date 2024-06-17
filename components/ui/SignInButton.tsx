// components/ui/SignInButton.tsx
import React from 'react';
import firebase from '@/app/lib/firebase'; // Ensure this path is correct
// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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
    <button
      onClick={signInWithGoogle}
      className="rounded bg-blue-500 px-4 py-2 text-white"
    >
      Sign in with Google
    </button>
  );
};

export default SignInButton;
