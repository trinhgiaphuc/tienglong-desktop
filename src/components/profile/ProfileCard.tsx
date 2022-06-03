import * as React from 'react';

import imgSrc from '../../assets/images/avatar.png';
import medalIcon from '../../assets/icons/medal.svg';
import newMemberIcon from '../../assets/icons/new-member.svg';

export default function ProfileCard() {
  return (
    <aside>
      <div className="bg-gray-100 dark:bg-gray-700 shadow rounded-lg p-10">
        <div className="flex flex-col gap-1 text-center items-center">
          <img
            className="h-32 w-32 bg-gray-100 dark:bg-red-800 p-2 rounded-full shadow mb-4"
            src={imgSrc}
            alt="user avatar"
          />
          <p className="font-semibold text-yellow-300 text-2xl">John Cena</p>
          <div className="text-md leading-normal text-white flex justify-center items-center">
            Lời Giới Thiệu
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 my-3 ">
          <div className="font-semibold text-center mx-4">
            <p className="text-white">102</p>
            <span className="text-yellow-300">Words</span>
          </div>
          <div className="font-semibold text-center mx-4">
            <p className="text-white">102</p>
            <span className="text-yellow-300">Hearts</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 shadow mt-6 rounded-lg p-2">
        <img
          className="w-16 object-cover h-16 rounded-xl"
          src={medalIcon}
          alt="medal icon"
        />
        <img
          className="w-16 object-cover h-16 rounded-xl"
          src={newMemberIcon}
          alt="medal icon"
        />
      </div>

      <div className="mt-5 space-x-4 flex justify-center items-center w-full">
        <HotWord bgColor="bg-gradient-to-t from-red-400 to-yellow-300" />
        <HotWord bgColor="bg-gradient-to-t from-blue-500 to-yellow-400" />
      </div>
    </aside>
  );
}

type HotWordProps = {
  bgColor: string;
};

function HotWord({ bgColor }: HotWordProps) {
  return (
    <div className="relative flex flex-col justify-between bg-white rounded-3xl bg-cover text-gray-800 overflow-hidden cursor-pointer w-full object-cover object-center h-64 my-2 hot">
      <div className={`absolute ${bgColor} opacity-80 inset-0 z-0`}></div>
      <div className="relative flex flex-row items-end h-72 w-full ">
        <button className="absolute right-0 top-0 m-2">
          <span className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200">
            X
          </span>
        </button>
        <div className="p-6 rounded-lg flex flex-col w-full z-10">
          <h4 className="mt-1 dark:text-blue-900 text-white text-xl font-semibold leading-tight truncate">
            Loremipsum..
          </h4>
          <div className="flex pt-4 text-sm text-gray-300">
            <div className="flex items-center mr-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <p className="font-normal">4.5</p>
            </div>
            <div className="flex items-center font-medium text-white">
              1800
              <span className="text-gray-300 text-sm font-normal">hearts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
