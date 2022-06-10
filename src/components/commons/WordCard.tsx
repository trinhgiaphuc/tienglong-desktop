import * as React from 'react';
import { Word } from '../../typings';

export default function WordCard({
  author,
  createdYear,
  definition,
  word,
}: Word) {
  return (
    <article className="w-full relative rounded-md overflow-hidden">
      <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative top-0 left-0  duration-300 ">
        <p className="text-md w-max text-gray-700 dark:text-white font-semibold">
          {createdYear}
        </p>
        <div className="flex items-end space-x-2 my-6">
          <p className="text-3xl mx-auto text-black dark:text-white font-bold">
            {word}
          </p>
        </div>
        <div className="dark:text-white">
          <div className="flex items-center text-sm space-x-12 md:space-x-24 justify-between">
            <p className="ml-auto font-semibold text-lg">{author}</p>
          </div>
        </div>
      </div>
      <div className="shadow-lg  h-full w-full overflow-y-scroll small-scrollbar bg-white dark:bg-gray-700 absolute top-0 left-0 opacity-0 hover:opacity-100 duration-300">
        <p className="text-black py-6 text-center px-4 text-lg  dark:text-white absolute w-full break-words">
          {definition}
        </p>
      </div>
    </article>
  );
}
