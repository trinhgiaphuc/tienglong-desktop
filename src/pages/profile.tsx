import * as React from 'react';
import ProfileCard from '../components/profile/ProfileCard';
import UserWordList from '../components/profile/UserWordList';

export default function ProfilePage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 w-screen h-screen overflow-x-hidden overflow-y-scroll no-scrollbar lg:overflow-y-hidden select-none">
      <main className="lg:grid  grid-cols-2 flex flex-col gap-6 m-12 px-2">
        <ProfileCard />
        <UserWordList />
      </main>
    </div>
  );
}
