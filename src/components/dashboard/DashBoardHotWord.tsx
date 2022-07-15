import * as React from 'react';
import { Word } from '../../typings';
import { Link } from 'react-router-dom';

export default function DashBoardHotWord({ hotWord }: { hotWord: Word }) {
  return (
    <React.Fragment>
      <div className="w-full md:w-6/12 overflow-hidden hot rounded-md">
        <div className="w-full bg-white dark:bg-gray-700 relative  overflow-hidden">
          <button className="w-full h-full py-8 block ">
            <Link to={`/word/${hotWord?.id}`}>
              <p className="text-3xl text-gray-700 dark:text-white text-center font-semibold">
                {hotWord?.word || 'loading...'}
              </p>
            </Link>
          </button>
        </div>
      </div>
      <div className="flex items-center w-full md:w-1/2 space-x-4">
        <div className="w-1/2 hot rounded-md overflow-hidden">
          <div className="shadow-lg px-4 py-8 w-full bg-white dark:bg-gray-700 relative">
            <p className="text-3xl text-center text-black dark:text-white font-bold">
              {typeof hotWord?.heartCount === 'number' ? hotWord.heartCount : 'loading...'}
            </p>
          </div>
        </div>
        <div className="w-1/2 hot rounded-md overflow-hidden">
          <div className="shadow-lg px-4 py-8 w-full bg-white dark:bg-gray-700 relative">
            <p className="text-3xl text-center text-black dark:text-white font-bold">
              {hotWord?.author || 'loading...'}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
