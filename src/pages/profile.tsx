import * as React from 'react';
import { useUser } from '../lib/userContext';
import { ProfileCard, UserWordList } from '../components/profile';

export default function ProfilePage() {
  const { user } = useUser();
  if (!user) return null;
  const { image } = user;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 w-screen h-screen overflow-x-hidden overflow-y-scroll no-scrollbar lg:overflow-y-hidden select-none">
      <main className="lg:grid  grid-cols-2 flex flex-col gap-6 m-12 px-2">
        <ProfileCard userDetails={user} />
        {/* <UserWordList userWords={user.userWords} image={image} /> */}
      </main>
    </div>
  );
}
