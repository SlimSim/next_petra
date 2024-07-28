// app/lib/useAuth.ts
import { useState, useEffect } from 'react';
import firebase from './firebase';

// Define a type that includes the properties we know we'll use
type FirebaseUser = {
  displayName: string | null;
  photoURL: string | null;
  // Add other properties you might need
};

const useAuth = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Extract only the properties we need
        const { displayName, photoURL } = firebaseUser;
        setUser({ displayName, photoURL });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user };
};

export default useAuth;