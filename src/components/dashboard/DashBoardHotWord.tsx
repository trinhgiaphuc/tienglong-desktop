import * as React from 'react';

export default function DashBoardHotWord() {
  return (
    <React.Fragment>
      <div className="w-full md:w-6/12 overflow-hidden hot rounded-md">
        <div className="w-full bg-white dark:bg-gray-700 relative  overflow-hidden">
          <a href="#" className="w-full h-full py-8 block ">
            <p className="text-3xl text-gray-700 dark:text-white text-center font-semibold">
              Ok Nha
            </p>
          </a>
        </div>
      </div>
      <div className="flex items-center w-full md:w-1/2 space-x-4">
        <div className="w-1/2 hot rounded-md overflow-hidden">
          <div className="shadow-lg px-4 py-8 w-full bg-white dark:bg-gray-700 relative">
            <p className="text-3xl text-center text-black dark:text-white font-bold">
              1247
            </p>
          </div>
        </div>
        <div className="w-1/2 hot rounded-md overflow-hidden">
          <div className="shadow-lg px-4 py-8 w-full bg-white dark:bg-gray-700 relative">
            <p className="text-3xl text-center text-black dark:text-white font-bold">
              Tác Giả
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
