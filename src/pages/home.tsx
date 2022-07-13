import * as React from 'react';
import { Word } from '../typings';
import WordCard from '../components/commons/WordCard';
import { DashBoardHead, DashBoardHotWord } from '../components/dashboard';
import { useUser } from '../lib/userContext';

type PropsTypes = {
  todayWords: Word[];
  trendingWords: Word[];
};

export default function HomePage({ todayWords, trendingWords }: PropsTypes) {
  const { user } = useUser();
  let username: string, userImg: string;

  if (user) {
    ({ username, image: userImg } = user);
  }

  return (
    <div className="flex flex-col w-full md:space-y-4 font-ole">
      <DashBoardHead username={username} userImg={userImg} />
      <div className="overflow-y-scroll small-scrollbar h-screen pb-24 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
          Xin Chào, {username ? username : 'Chúc một ngày tốt lành'}
        </h1>
        <h2 className="text-md text-gray-400">
          Cùng xem hôm nay đã có những từ nào được định nghĩa nhé!
        </h2>
        <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
          <DashBoardHotWord hotWord={trendingWords[0]} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          {todayWords.map((word: Word) => (
            <WordCard key={word.id} {...word} />
          ))}
        </div>
      </div>
    </div>
  );
}
