import * as React from 'react';
import { useUser } from '../lib/userContext';

type SuggestTag = {
  id: string;
  title: string;
};

const suggestTag: {
  trend: SuggestTag[];
  source: SuggestTag[];
} = {
  trend: [
    { id: 'khongloithoi', title: 'Không lỗi thời' },
    { id: 'dangthinhhanh', title: 'Đang thịnh hành' },
    { id: 'khongphobien', title: 'Không còn phổ biến' },
  ],
  source: [
    { id: 'mienbac', title: 'Nguồn gốc từ phía Bắc' },
    { id: 'mientrung', title: 'Nguồn gốc từ miền Trung' },
    { id: 'miennam', title: 'Nguồn gốc từ phía Nam' },
  ],
};

type WordState = {
  wordForm: {
    word: string;
    definition: string;
    example: string;
    otherTags: string;
    suggestedTag: { trend: string; source: string };
    createdYear: string;
  };
  error: { wordError: string; definitionError: string; exampleError: string };
};

type WordAction = {
  type: 'UPDATE_WORD' | 'ERROR' | 'RESET_ERROR';
  payload: {
    wordForm?: {
      word: string;
      definition: string;
      example: string;
      otherTags: string;
      suggestedTag: {
        trend: string;
        source: string;
      };
      createdYear: string;
    };
    error?: {
      wordError: string;
      definitionError: string;
      exampleError: string;
    };
  };
};

const INITIAL_WORD_STATE: WordState = {
  wordForm: {
    word: '',
    definition: '',
    example: '',
    otherTags: '',
    suggestedTag: { source: '', trend: '' },
    createdYear: '2022',
  },
  error: { wordError: '', definitionError: '', exampleError: '' },
};

const wordReducer: React.Reducer<WordState, WordAction> = (
  state = INITIAL_WORD_STATE,
  { type, payload: { error, wordForm } }: WordAction
) => {
  switch (type) {
    case 'UPDATE_WORD':
      return { error: state.error, wordForm };
    case 'ERROR':
      return { wordForm: state.wordForm, error };
    case 'RESET_ERROR':
      return { wordForm: state.wordForm, error };
    default:
      throw new Error(`INVALID ACTION TYPE: ${type}`);
  }
};

export default function DefinePage() {
  const { user } = useUser();

  const [
    {
      wordForm,
      error: { wordError, definitionError, exampleError },
    },
    dispatch,
  ] = React.useReducer(wordReducer, INITIAL_WORD_STATE);

  const {
    word,
    definition,
    example,
    otherTags,
    suggestedTag: { source, trend },
    createdYear,
  } = wordForm;

  const thisYear = new Date().getFullYear();
  const years = new Array(thisYear - 1999).fill('*').map((_, i) => i + 2000);

  function transformStringTagToArray(): string[] {
    let tagValue = otherTags;
    if (tagValue[0] === '#') {
      tagValue = tagValue.slice(1);
    }
    return [createdYear, trend, source, ...tagValue.split('#')].filter(Boolean);
  }

  function formIsValid() {
    let wordErr = '';
    let defError = '';
    let exError = '';
    if (word.trim().length < 1) wordErr = 'xin hãy điền từ cần định nghĩa';
    if (definition.trim().length < 15)
      defError = 'Xin hãy định nghĩa từ dài thêm 1 chút (20 ký tự)';
    if (example.trim().length < 15)
      exError = 'Xin hãy cho ví dụ dài thêm 1 chút (20 ký tự)';

    if (wordErr.length > 0 || defError.length > 0 || exError.length > 0) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: {
            wordError: wordErr,
            definitionError: defError,
            exampleError: exError,
          },
        },
      });
      return false;
    }

    return true;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const tags = transformStringTagToArray();
    if (formIsValid()) {
      window.electron.ipcRenderer.sendMessage('create-word', [
        {
          word,
          definition,
          example,
          tags,
          author: user.userDetails.username,
        },
      ]);
    }
  }

  function resetError(
    errorName: 'definitionError' | 'exampleError' | 'wordError'
  ) {
    let payload: { error: WordState['error'] };

    switch (errorName) {
      case 'wordError':
        payload = { error: { definitionError, exampleError, wordError: '' } };
        break;
      case 'definitionError':
        payload = { error: { wordError, exampleError, definitionError: '' } };
        break;
      case 'exampleError':
        payload = { error: { wordError, definitionError, exampleError: '' } };
        break;
      default:
        throw new Error(`INVALID ERROR NAME: ${errorName}`);
    }

    return () => dispatch({ type: 'RESET_ERROR', payload });
  }

  function updateWord(type: 'word' | 'definition' | 'example' | 'otherTags') {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      dispatch({
        type: 'UPDATE_WORD',
        payload: { wordForm: { ...wordForm, [type]: e.target.value } },
      });
  }

  return (
    <div className="container mx-auto h-screen">
      <div className="max-w-2xl p-5 mx-auto mt-16 small-scrollbar bg-gray-100 rounded-md shadow-sm h-[90%] overflow-y-scroll">
        <h1 className="my-3 text-3xl font-semibold text-gray-700 text-center">
          Định nghĩa
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="word" className="block mb-2 text-base text-black">
              Từ ngữ *
            </label>
            <input
              type="text"
              id="word"
              value={word}
              onChange={updateWord('word')}
              placeholder="xin mời nhập từ ngữ ở ô này"
              required
              maxLength={100}
              className="w-full px-3 bg-gray-200 py-2 placeholder-gray-400 rounded-md  focus:outline-none focus:ring focus:ring-blue-100 focus:shadow focus:border-indigo-300"
            />

            {wordError ? (
              <div className="my-4">
                <DisplayError error={wordError} />
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="definition"
              className="block mb-2 text-base text-black"
            >
              Định Nghĩa Từ *
            </label>
            <textarea
              rows={5}
              maxLength={3000}
              value={definition}
              onFocus={resetError('definitionError')}
              onChange={updateWord('definition')}
              id="definition"
              placeholder="xin mời nhập định nghĩa ở ô này"
              required
              className="w-full px-3 bg-gray-200 py-2 resize-none placeholder-gray-400 rounded-md  focus:outline-none focus:ring focus:ring-blue-100 focus:shadow focus:border-indigo-300"
            />

            {definitionError ? (
              <div className="my-4">
                <DisplayError error={definitionError} />
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label htmlFor="example" className="text-base text-black">
              Ví dụ *
            </label>
            <textarea
              id="example"
              rows={5}
              value={example}
              onFocus={resetError('exampleError')}
              onChange={updateWord('example')}
              maxLength={3000}
              placeholder="xin mời nhập ví dụ ở ô này"
              required
              className="w-full px-3 bg-gray-200 py-2  resize-none placeholder-gray-400 rounded-md  focus:outline-none focus:ring focus:ring-blue-100 focus:shadow focus:border-indigo-300"
            />

            {exampleError ? (
              <div className="my-4">
                <DisplayError error={exampleError} />
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label htmlFor="tag" className="block mb-2 text-base text-black">
              Thẻ từ *
            </label>
            <input
              pattern="^[a-zA-Z0-9#]*$"
              type="text"
              id="tag"
              value={otherTags}
              onChange={updateWord('otherTags')}
              maxLength={500}
              placeholder="#conga#convit"
              className="w-full px-3 bg-gray-200 py-2 placeholder-gray-400 rounded-md  focus:outline-none focus:ring focus:ring-blue-100 focus:shadow focus:border-indigo-300"
            />
          </div>

          <div className="mb-2 inline-block relative">
            <select
              className="bg-gray-300 text-gray-700 focus:outline focus:outline-blue-100 font-semibold py-2 px-4 rounded items-center no-scrollbar"
              onChange={({ target: { value: createdYear } }) =>
                dispatch({
                  type: 'UPDATE_WORD',
                  payload: {
                    wordForm: { ...wordForm, createdYear },
                  },
                })
              }
            >
              <option value={thisYear} defaultChecked>
                Năm
              </option>
              <option value="DiSản">Di Sản</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="my-4 h-[1px] bg-gray-200" />

          <div className="mb-6">
            <div>
              <label className="text-base font-medium text-black">
                Một số thẻ gợi ý{' '}
                <span className="text-gray-700">(không bắt buộc)</span>
              </label>
              <p className="text-sm leading-5 text-gray-600">
                Giúp cho việc tìm kiếm từ trở nên dễ dàng hơn.
              </p>
              <fieldset className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="no-source"
                      name="source"
                      type="radio"
                      value=""
                      onChange={() =>
                        dispatch({
                          type: 'UPDATE_WORD',
                          payload: {
                            wordForm: {
                              ...wordForm,
                              suggestedTag: { trend, source: '' },
                            },
                          },
                        })
                      }
                      defaultChecked={true}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="no-source"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Không
                    </label>
                  </div>
                  {suggestTag.source.map(({ id, title }) => (
                    <div key={id} className="flex items-center">
                      <input
                        id={id}
                        name="source"
                        type="radio"
                        value={id}
                        onChange={(e) =>
                          dispatch({
                            type: 'UPDATE_WORD',
                            payload: {
                              wordForm: {
                                ...wordForm,
                                suggestedTag: { trend, source: e.target.value },
                              },
                            },
                          })
                        }
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor={id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {title}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="my-4 h-[1px] bg-gray-200" />

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="no-trend"
                      value=""
                      onChange={() =>
                        dispatch({
                          type: 'UPDATE_WORD',
                          payload: {
                            wordForm: {
                              ...wordForm,
                              suggestedTag: { source, trend: '' },
                            },
                          },
                        })
                      }
                      name="trend"
                      type="radio"
                      defaultChecked={true}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="no-trend"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Không
                    </label>
                  </div>
                  {suggestTag.trend.map(({ id, title }) => (
                    <div key={id} className="flex items-center">
                      <input
                        id={id}
                        value={id}
                        onChange={(e) =>
                          dispatch({
                            type: 'UPDATE_WORD',
                            payload: {
                              wordForm: {
                                ...wordForm,
                                suggestedTag: { source, trend: e.target.value },
                              },
                            },
                          })
                        }
                        name="trend"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor={id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          <div className="mb-6 h-[1px] bg-gray-200" />

          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-2 py-4 text-white bg-purple-600 rounded-md  focus:scale-95 duration-75 focus:outline-none"
            >
              Định Nghĩa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DisplayError({ error }: { error: string }) {
  return (
    <h1 className="rounded-md text-center border border-black bg-red-500 text-base bg-opacity-80 p-2">
      {error}
    </h1>
  );
}
