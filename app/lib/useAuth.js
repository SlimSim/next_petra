// app/lib/useAuth.ts
import { useState, useEffect } from 'react';
import firebase from './firebase';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  return { user };
};

export default useAuth;
