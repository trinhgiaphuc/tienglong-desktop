import * as React from 'react';
import { signIn } from '../lib/firebase';

export default function Login() {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white font-family-karla h-screen w-screen">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <a href="#" className="bg-black text-white font-bold text-xl p-4">
              Tiếng Lòng
            </a>
          </div>

          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Chào Mừng.</p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col pt-3 md:pt-8"
            >
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="toiyeuem@gmail.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Mật Khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="mật khẩu"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <input
                type="submit"
                value="Đăng nhập"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 cursor-pointer"
              />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Chưa có tài khoản?{' '}
                <button
                  onClick={window.electron.shell.signUp}
                  className="underline font-semibold"
                >
                  Đăng ký ngay.
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
          />
        </div>
      </div>
    </div>
  );
}
