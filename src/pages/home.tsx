import * as React from 'react';
import WordCard from '../components/commons/WordCard';
import { DashBoardHead, DashBoardHotWord } from '../components/dashboard';

export default function HomePage() {
  React.useEffect(() => {
    window.electronAPI.ipcRenderer
      .invoke('today-words')
      .then(console.log, console.error);
  }, []);

  return (
    <div className="flex flex-col w-full md:space-y-4">
      <DashBoardHead />
      <div className="overflow-y-scroll small-scrollbar h-screen pb-24 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
          Xin Chào, John
        </h1>
        <h2 className="text-md text-gray-400">
          Cùng xem hôm nay đã có những từ nào được định nghĩa nhé!
        </h2>
        <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
          <DashBoardHotWord />
        </div>

        <DateSelector />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
        </div>
      </div>
    </div>
  );
}

function DateSelector() {
  return (
    <div className="flex items-center space-x-4">
      <button className="flex items-center text-gray-400 text-md border-gray-300 border px-4 py-2 rounded-tl-sm rounded-bl-full rounded-r-full">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="mr-2 text-gray-400"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M192 1664h288v-288h-288v288zm352 0h320v-288h-320v288zm-352-352h288v-320h-288v320zm352 0h320v-320h-320v320zm-352-384h288v-288h-288v288zm736 736h320v-288h-320v288zm-384-736h320v-288h-320v288zm768 736h288v-288h-288v288zm-384-352h320v-320h-320v320zm-352-864v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm736 864h288v-320h-288v320zm-384-384h320v-288h-320v288zm384 0h288v-288h-288v288zm32-480v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h128v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z"></path>
        </svg>
        Last month
        <svg
          width="20"
          height="20"
          className="ml-2 text-gray-400"
          fill="currentColor"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"></path>
        </svg>
      </button>
    </div>
  );
}
