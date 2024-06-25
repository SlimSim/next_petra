// components/ui/UserProfile.tsx
'use client';
import React from 'react';
import useAuth from '@/app/lib/useAuth';
import Image from 'next/image';
import IconButton from '../slimSim/iconButton';
import { cn } from '@/lib/utils';

interface ProfileBottomProps {
  className?: string;
}
const UserProfile: React.FC<ProfileBottomProps> = ({ className }) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    /*
    <div className="flex items-center space-x-4">
      <Image
        src={user.photoURL || ''}
        alt="Profile"
        width={40}
        height={40}
        className="rounded-full"
      />
      <span>{user.displayName}</span>
    </div>
    */

    /*
    <IconButton
      className={cn(className)}
      icon={
        <Image src={user.photoURL || ''} alt="Profile" width={24} height={24} />
      }
      onClick={() => {}}
    >
      {user.displayName}
    </IconButton>
    */
    <p>Signed In</p>
  );
};

export default UserProfile;
