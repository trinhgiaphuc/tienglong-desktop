import * as React from 'react';
import { Word } from '../../typings';
import Reaction from '../buttons/Reaction';

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

