import * as React from 'react';
import { signIn } from '../lib/firebase';

type FormState = {
  email: string;
  password: string;
  loading: boolean;
  error: string;
};

const initialState: FormState = {
  email: '',
  password: '',
  loading: false,
  error: '',
};

type Action = {
  payload?: {
    email?: string;
    password?: string;
    error?: string;
  };
  type: 'SET_FORM' | 'CLEAR_ERROR' | 'ON_SUBMIT' | 'ON_ERROR' | 'ON_SUCCESS';
};

function formReducer(
  state = initialState,
  { type, payload }: Action
): FormState {
  switch (type) {
    case 'SET_FORM':
      return { ...state, error: '', ...payload };
    case 'ON_ERROR':
      return { ...state, loading: false, error: payload.error };
    case 'ON_SUBMIT':
      return { ...state, error: '', loading: true };
    case 'ON_SUCCESS':
      return { ...state, loading: false };
    default:
      throw new Error(`Invalid action type: ${type}`);
  }
}

export default function Login() {
  const [{ email, password, loading, error }, dispatch] = React.useReducer(
    formReducer,
    initialState
  );

  function setForm(payload: Action['payload'] = {}) {
    dispatch({ type: 'SET_FORM', payload });
  }

  function setError(error?: string) {
    dispatch({
      type: 'ON_ERROR',
      payload: {
        error: error
          ? error
          : 'Tên đăng nhập hoặc mật khẩu không đúng, vui lòng kiểm tra lại',
      },
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: 'ON_SUBMIT' });
    if (email.length < 3 || password.length < 1) {
      setError();
      return;
    }

    try {
      if (email.includes('@gmail.com')) {
        await signIn(email, password);
      } else {
        await signIn(`${email}@gmail.com`, password);
      }
      dispatch({ type: 'ON_SUCCESS' });
    } catch (error) {
      setError();
    }
  }

  return (
    <div className="bg-white font-family-karla h-screen w-screen">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <p className="bg-black text-white font-bold text-xl p-4">
              Tiếng Lòng
            </p>
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
                <div className="flex items-center justify-between shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 focus:shadow-outline">
                  <input
                    type="text"
                    onFocus={() => setForm()}
                    id="email"
                    value={email}
                    onChange={(e) => setForm({ email: e.target.value })}
                    placeholder="toiyeuban"
                    className="leading-tight flex-grow focus:outline-none"
                  />
                  <p className="min-w-max">@gmail.com</p>
                </div>
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Mật Khẩu
                </label>
                <input
                  type="password"
                  onFocus={() => setForm()}
                  id="password"
                  value={password}
                  onChange={(e) => setForm({ password: e.target.value })}
                  placeholder="mật khẩu"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {error ? (
                <h2 className="bg-red-500 p-2 mt-8 rounded-md border-black border">
                  {error}
                </h2>
              ) : null}

              <button
                type="submit"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 cursor-pointer"
              >
                Đăng nhập
              </button>
            </form>

            {loading ? <p>Loading</p> : null}

            <div className="text-center pt-12 pb-12">
              <button
                onClick={() => {
                  console.log('OK');
                  window.electron.shell.resetPassword();
                }}
                className="underline font-semibold"
              >
                Quên mật khẩu?
              </button>
            </div>
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
