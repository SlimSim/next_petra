import * as React from 'react';
import SignInButton from '../ui/SignInButton';
import useAuth from '../../app/lib/useAuth';
import SignOutButton from '../ui/SignOutButton';

const SignInOrOut: React.FC = () => {
  const { user } = useAuth();

  return <>{user ? <SignOutButton /> : <SignInButton />}</>;
};

export default SignInOrOut;
