import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  facebookProvider,
  googleProvider,
  handleSignIn,
} from '../lib/firebase';
import { useUser } from '../lib/userContext';

export default function Login() {
  const { user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/main_window');
    }
  }, [user]);

  return (
    <div className="h-screen w-screen grid place-items bg-gradient-to-tl from-green-500 to-indigo-700 py-16 px-4">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg lg:w-1/4 md:w-1/2 w-full p-10 mt-16 shadow-lg shadow-zinc-600">
          <p
            tabIndex={0}
            className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
          >
            Xin mời quý khách đăng nhập
          </p>
          <button
            onClick={() => handleSignIn(googleProvider)}
            aria-label="Continue with google"
            role="button"
            className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="20"
              fill="none"
            >
              <path
                fill="#4285F4"
                d="M19 10.2c0-.8 0-1.4-.2-2H9.7v3.6H15c0 1-.7 2.4-2 3.3v.1l2.9 2.3h.2a9.9 9.9 0 0 0 2.9-7.3Z"
              />
              <path
                fill="#34A853"
                d="M9.7 20a9 9 0 0 0 6.4-2.5l-3-2.4a5.9 5.9 0 0 1-9-3.1H4l-3 2.3v.1A9.7 9.7 0 0 0 9.6 20Z"
              />
              <path
                fill="#FBBC05"
                d="M4.2 12a6.3 6.3 0 0 1 0-4v-.1l-3-2.5H1a10.2 10.2 0 0 0 0 9L4.2 12Z"
              />
              <path
                fill="#EB4335"
                d="M9.7 3.9c1.8 0 3 .8 3.7 1.4l2.8-2.7A9.2 9.2 0 0 0 9.7 0C5.9 0 2.7 2.2 1 5.5L4.2 8c.8-2.4 3-4.1 5.5-4.1Z"
              />
            </svg>
            <p className="text-base font-medium ml-4 text-gray-700">
              Continue with Google
            </p>
          </button>
          <button
            onClick={() => handleSignIn(facebookProvider)}
            aria-label="Continue with twitter"
            role="button"
            className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              width={24}
              height={24}
              viewBox="0 0 455.7 455.7"
            >
              <path
                fill="#3a559f"
                d="M0 0v456h243V280h-60v-72h60v-61c0-43 35-79 79-79h62v65h-44c-14 0-25 11-25 25v50h68l-9 72h-59v176h141V0H0z"
              />
            </svg>
            <p className="text-base font-medium ml-4 text-gray-700">
              Continue with Facebook
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
