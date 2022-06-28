import * as React from 'react';

export default function ChatHead() {
  return (
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <ChatTitle />
      <ChatUtilButtons />
    </div>
  );
}

function ChatTitle() {
  return (
    <div className="relative flex items-center space-x-4">
      <div className="relative">
        <span className="absolute text-green-500 right-0 bottom-0">
          <svg width="20" height="20">
            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
          </svg>
        </span>
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          alt="tienglong icon"
          className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <div className="text-2xl mt-1 flex items-center">
          <span className="text-yellow-200 mr-3">Tiếng Lòng</span>
        </div>
        <span className="text-lg text-yellow-50">ten1,ten2,ten3,...</span>
      </div>
    </div>
  );
}

function ChatUtilButtons() {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-lg border border-yellow-400 h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            style={{ stroke: 'yellow' }}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  );
}
