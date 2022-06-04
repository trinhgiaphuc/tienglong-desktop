import * as React from 'react';

export default function WordCard() {
  return (
    <article className="w-full relative rounded-md overflow-hidden">
      <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative top-0 left-0  duration-300 ">
        <p className="text-md w-max text-gray-700 dark:text-white font-semibold">
          2022
        </p>
        <div className="flex items-end space-x-2 my-6">
          <p className="text-5xl mx-auto text-black dark:text-white font-bold">
            Từ Ngữ
          </p>
        </div>
        <div className="dark:text-white">
          <div className="flex items-center text-sm space-x-12 md:space-x-24 justify-between">
            <p className="ml-auto font-semibold text-lg">Tác Giả</p>
          </div>
        </div>
      </div>
      <div className="shadow-lg  h-full w-full overflow-y-scroll small-scrollbar bg-white dark:bg-gray-700 absolute top-0 left-0 opacity-0 hover:opacity-100">
        <p className="text-black py-6 text-center px-4 text-lg  dark:text-white absolute w-full break-words">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
          voluptates corrupti doloribus nobis animi praesentium rerum ipsam vel
          suscipit aspernatur harum minus, alias molestias libero laudantium
          commodi facilis eaque ducimus.
        </p>
      </div>
    </article>
  );
}
