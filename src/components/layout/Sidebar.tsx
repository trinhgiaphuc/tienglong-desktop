import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { adminIcon, feedbackIcon, homeIcon, meIcon } from '../../assets/icons';
import { handleSignOut } from '../../lib/firebase';

type PageRoute = {
  path: string;
  name: string;
  iconSrc: string;
};

const routes: Array<PageRoute> = [
  {
    path: '/main_window',
    name: 'Trang Chủ',
    iconSrc: homeIcon,
  },
  {
    path: '/me',
    name: 'Trang Cá Nhân',
    iconSrc: meIcon,
  },
  { path: '/admin', name: 'Quản Trị', iconSrc: adminIcon },
  {
    path: 'feedback',
    name: 'Phản Hồi',
    iconSrc: feedbackIcon,
  },
];

export default function Sidebar() {
  return (
    <div className="h-screen hidden lg:block shadow-lg relative w-80 font-ole select-none">
      <div className="bg-white h-full dark:bg-gray-800 relative">
        <div className="flex items-center justify-start pt-6 ml-8">
          <p className="font-bold dark:text-white text-xl">Tiếng Lòng</p>
        </div>
        <nav className="mt-6">
          {routes.map((routeDetails) => (
            <MainLink {...routeDetails} key={routeDetails.path} />
          ))}
        </nav>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center pl-6 p-2 my-2 justify-start hover:text-[#fff1ac] text-gray-800 dark:text-gray-400 border-purple-500 absolute bottom-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={24}
            height={24}
            fill="#fff1ac"
            viewBox="0 0 491.2 491.2"
          >
            <path d="M319 73a172 172 0 0 0-155 96l27 13a143 143 0 1 1 0 127l-27 13a173 173 0 0 0 155 96 173 173 0 0 0 0-345z" />
            <path d="M319 261v-30H57l35-35-21-21-71 71 71 70 21-21-35-34z" />
          </svg>
          <span className="ml-1">Đăng Xuất</span>
        </button>
      </div>
    </div>
  );
}

function MainLink({ name, iconSrc, path }: PageRoute) {
  const { pathname } = useLocation();

  return (
    <NavLink
      className={`w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-[#fff1ac] ${
        pathname === path
          ? 'text-gray-800 dark:text-[#fff1ac] border-l-4 border-purple-500'
          : 'text-gray-400 border-l-4 border-transparent'
      }`}
      to={path}
      draggable={false}
    >
      <span className="text-left">
        <img
          width={20}
          height={20}
          className="stroke-white"
          src={iconSrc}
          alt="icon"
        />
      </span>
      <span className="mx-2 text-sm font-normal">{name}</span>
    </NavLink>
  );
}
