import * as React from 'react';

import { medalIcon, newMemberIcon } from '../../assets/icons';
import type { UserDetails } from '../../typings';

export default function ProfileCard({
  userDetails,
}: {
  userDetails: UserDetails;
}) {
  const { image, username, words, hearts } = userDetails;

  return (
    <aside className="font-ole">
      <div className="bg-gray-100 dark:bg-gray-700 shadow rounded-lg p-10">
        <div className="flex flex-col gap-1 text-center items-center">
          <img
            className="h-32 w-32 bg-gray-100 dark:bg-red-800 p-2 rounded-full shadow mb-4"
            src={image}
            alt="user avatar"
          />
          <p className="font-semibold text-yellow-300 text-2xl">{username}</p>
          <div className="text-md leading-normal text-white flex justify-center items-center">
            Lời Giới Thiệu
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 my-3 ">
          <div className="font-semibold text-center mx-4">
            <p className="text-white">{words}</p>
            <span className="text-yellow-300">Words</span>
          </div>
          <div className="font-semibold text-center mx-4">
            <p className="text-white">{hearts}</p>
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

function HotWord({ bgColor }: { bgColor: string }) {
  return (
    <div className="relative flex flex-col justify-between bg-white rounded-3xl bg-cover text-gray-800 overflow-hidden cursor-pointer w-full object-cover object-center h-64 my-2 hot">
      <div
        className={`${bgColor} flex items-center justify-center h-full w-full`}
      >
        <div className="p-6 rounded-lg flex flex-col items-center justify-center  w-full z-10">
          <h4 className="mt-1 p-2 dark:text-blue-900 bg-black bg-opacity-10 text-white text-2xl font-semibold leading-tight truncate rounded-lg w-full">
            The Word Is Here HAAHA
          </h4>
          <div className="flex pt-4 text-sm justify-end text-gray-300">
            <div className="flex items-center mr-auto">
              <svg
                className="h-6 w-6 stroke-red-700"
                fill="#ff5000"
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
              <p className="font-semibold ml-1 text-black">1800</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 px-2 py-5 small-scrollbar h-full overflow-y-scroll w-full z-10 ${bgColor} hover:opacity-100 opacity-0 duration-300 `}
      >
        <p className="text-center text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          sed eius ea saepe alias, molestiae vero? Atque modi ducimus nulla quam
          itaque consequatur vitae, in ad ea aliquam, voluptas eveniet. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Velit obcaecati
          magni aperiam eveniet, nam rem sunt, et natus odit, veritatis aliquid
          atque assumenda suscipit quod earum soluta culpa qui! Facilis.
        </p>
        <div className="border-b border-gray-600 my-5"></div>
        <p className="text-center text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          sed eius ea saepe alias, molestiae vero? Atque modi ducimus nulla quam
          itaque consequatur vitae, in ad ea aliquam, voluptas eveniet. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Velit obcaecati
          magni aperiam eveniet, nam rem sunt, et natus odit, veritatis aliquid
          atque assumenda suscipit quod earum soluta culpa qui! Facilis.
        </p>
      </div>
    </div>
  );
}
