import * as React from 'react';
import { Word } from '../../typings';

export default function UserWordList({
  userWords,
  image,
}: {
  userWords: Word[];
  image: string;
}) {
  return (
    <article className="font-ole text-xl">
      <input
        name="message"
        placeholder="Tìm Kiếm Từ..."
        className="w-full text-sm bg-white shadow rounded-lg mb-6 p-4 outline-none font-sans placeholder-gray-400"
      />

      <div className="overflow-y-scroll overflow-x-hidden no-scrollbar h-[900px] rounded-lg">
        {userWords.map((word) => (
          <WordCard key={word.id} image={image} {...word} />
        ))}
      </div>

    </article>
  );
}

type WordCard = {
  image: string;
  author: string;
  word: string;
  definition: string;
  example: string;
  updatedAt: number;
  heartCount: number;
  tags: string[];
  source: string;
  trend: string;
};

function WordCard(wordDetails: WordCard) {
  const {
    image,
    author,
    word,
    definition,
    example,
    updatedAt,
    heartCount,
    tags,
    source,
    trend,
  } = wordDetails;
  return (
    <div className="bg-gray-100 dark:bg-gray-700 shadow rounded-lg mb-6">
      <div className="flex flex-row px-2 py-3 mx-3">
        <div className="w-auto h-auto rounded-full">
          <img
            referrerPolicy="no-referrer"
            className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
            alt="User avatar"
            src={image}
          />
        </div>
        <div className="flex flex-col mb-2 ml-4 mt-1">
          <div className="text-gray-700 dark:text-white text-sm font-semibold">
            {author}
          </div>
          <div className="flex w-full mt-1">
            <div className="text-blue-700 dark:text-white font-base text-xs mr-1 cursor-pointer">
              {new Date(updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-600"></div>

      <div className="flex items-center mt-6 justify-center">
        <p className="text-3xl font-bold p-4 rounded-lg uppercase bg-gray-100 dark:bg-gray-900 tracking-wider text-gray-600 dark:text-yellow-300">
          {word}
        </p>
      </div>
      <div className="text-gray-600 dark:text-yellow-300 my-6 mx-3 px-2">
        <p className="p-2 text-xl text-center bg-gray-100 tracking-wide leading-relaxed dark:bg-gray-900 rounded-lg">
          {definition}
        </p>
      </div>
      <div className="text-gray-600 dark:text-yellow-300 my-6 mx-3 px-2 text-xl">
        <p className="p-2 text-center bg-gray-100 dark:bg-gray-800 rounded-lg tracking-wide leading-relaxed">
          {example}
        </p>
      </div>

      <div className="border-b border-gray-600"></div>

      <Reaction />

      <div className="border-b border-gray-600"></div>

      <div className="mt-3 mx-5 w-full text-sm">
        <div className="flex text-gray-600 dark:text-white  rounded-md items-center">
          Hearts:
          <span className="ml-1 text-gray-600 dark:text-white  text-ms">
            {heartCount}
          </span>
        </div>
      </div>

      <div className="text-black p-4 antialiased flex">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg">
          {tags.map((tag) => (
            <Tag key={tag} tagName={tag} />
          ))}
          {source ? <Tag tagName={source} /> : null}
          {trend ? <Tag tagName={trend} /> : null}
        </div>
      </div>
    </div>
  );
}

function Tag({ tagName }: { tagName: string }) {
  return (
    <p className="text-sm leading-relaxed tracking-widest p-1 dark:text-gray-300 hover:underline italic">
      #{tagName}
    </p>
  );
}

function Reaction() {
  return (
    <div className="flex justify-start w-full m-1 p-2">
      <span className="transition ease-out duration-300 hover:bg-red-500 border border-red-400 text-red-500 hover:text-black bg-transparent h-10 w-10 p-2 ml-2 flex items-center justify-center rounded-full cursor-pointer">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
          ></path>
        </svg>
      </span>

      <span className="transition ease-out duration-300 hover:bg-blue-500 bg-transparent text-blue-500 hover:text-black border border-blue-500 w-10 h-10 p-2 flex items-center justify-center rounded-full  cursor-pointer mr-5 ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M9 13a3 3 0 0 0 0-2m0 2a3 3 0 1 1 0-2m0 2 6 4m-6-6 6-4m0 0a3 3 0 1 0 6-2 3 3 0 0 0-6 2zm0 10a3 3 0 1 0 6 2 3 3 0 0 0-6-2z" />
        </svg>
      </span>

      <span className="transition ease-out duration-300 hover:bg-white bg-transparent border border-black w-10 h-10 p-2 flex items-center justify-center rounded-full  cursor-pointer mr-5 ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 60"
          xmlSpace="preserve"
        >
          <path fill="#ff4400" d="M54 36H8V4h46L44 20z" />
          <path d="M7 0 6 1v58a1 1 0 1 0 2 0V1L7 0z" fill="#000" />
        </svg>
      </span>
    </div>
  );
}
