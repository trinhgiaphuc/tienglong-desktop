import * as React from 'react';
import ProfileCard from '../components/profile/ProfileCard';
import UserWordList from '../components/profile/UserWordList';

export default function ProfilePage() {
  return (
    <div className="app bg-gray-100 dark:bg-gray-900">
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 mx-12 w-2xl container px-2">
        <ProfileCard />
        <UserWordList />
      </main>
    </div>
  );
}
