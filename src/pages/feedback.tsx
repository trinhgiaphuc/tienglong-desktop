import * as React from 'react';
import { computerIcon, logoIcon } from '../assets/icons';

export default function FeedbackPage() {
  return (
    <div className="bg-gray-800 text-gray-100 px-8 py-12 h-screen w-screen flex items-center justify-center flex-col font-ole">
      <div className="text-center w-full bg-gray-200 rounded-md">
        <img className="p-4 mx-auto" src={logoIcon} alt="icon tienglong" />
      </div>
      <div className="max-w-screen-xl mt-4 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-200 text-gray-900 rounded-lg shadow-lg">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Trò chuyện cùng chúng tôi!
            </h2>
            <div className="text-gray-700 mt-8">
              Bạn không thích form? Kết nối trực tiếp với chúng tôi qua{' '}
              <span className="underline">email</span> mọi lúc mọi nơi .
            </div>
          </div>
          <div className="mt-8 text-center">
            <img src={computerIcon} alt="computer icon" />
          </div>
        </div>
        <div className="">
          <div>
            <span className="uppercase text-sm text-gray-600 font-bold">
              Tên xưng hô
            </span>
            <input
              className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="xin mời nhập tên"
            />
          </div>
          <div className="mt-8">
            <span className="uppercase text-sm text-gray-600 font-bold">
              Email
            </span>
            <input
              className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="xin mời nhập địa chỉ email"
            />
          </div>
          <div className="mt-8">
            <span className="uppercase text-sm text-gray-600 font-bold">
              Nội dung phản hồi
            </span>
            <textarea
              placeholder="Xin mời nhập nội dung"
              className="w-full h-32 resize-none bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mt-8">
            <button className="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
