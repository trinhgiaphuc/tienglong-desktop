import * as React from 'react';
import {
  FormSubmittedModal,
  CreateWordTextAreaSection,
  CreateWordInputSection,
  CreateWordYearSelector,
  CreateWordSuggestTag,
} from '../components/form/addWord';
import { useUser } from '../lib/userContext';

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

export type WordAction = {
  type: 'UPDATE_WORD' | 'ERROR' | 'RESET_ERROR' | 'RESET_ALL';
  payload?: {
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
  { type, payload }: WordAction
) => {
  switch (type) {
    case 'UPDATE_WORD':
      return { error: state.error, wordForm: payload.wordForm };
    case 'ERROR':
      return { wordForm: state.wordForm, error: payload.error };
    case 'RESET_ERROR':
      return { wordForm: state.wordForm, error: payload.error };
    case 'RESET_ALL':
      return JSON.parse(JSON.stringify(INITIAL_WORD_STATE));
    default:
      throw new Error(`INVALID ACTION TYPE: ${type}`);
  }
};

export default function DefinePage() {
  const { user } = useUser();
  const [hideModal, setHideModal] = React.useState<boolean>(true);

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

  function updateWord(
    type:
      | 'word'
      | 'definition'
      | 'example'
      | 'otherTags'
      | 'createdYear'
      | 'trend'
      | 'source'
  ) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      if (type === 'trend') {
        dispatch({
          type: 'UPDATE_WORD',
          payload: {
            wordForm: {
              ...wordForm,
              suggestedTag: { trend, source: e.target.value },
            },
          },
        });
      } else if (type === 'source') {
        dispatch({
          type: 'UPDATE_WORD',
          payload: {
            wordForm: {
              ...wordForm,
              suggestedTag: { source, trend: e.target.value },
            },
          },
        });
      } else {
        dispatch({
          type: 'UPDATE_WORD',
          payload: { wordForm: { ...wordForm, [type]: e.target.value } },
        });
      }
    };
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const tags = transformStringTagToArray();
    if (formIsValid()) {
      window.electron.ipcRenderer.sendMessage('create-word', [
        console.log({
          word,
          definition,
          example,
          tags,
          author: user.username,
        }),
      ]);
      // setHideModal(false);
    }
  }

  return (
    <div className="container mx-auto h-screen">
      {hideModal ? null : (
        <FormSubmittedModal dispatch={dispatch} setHideModal={setHideModal} />
      )}
      <div className="max-w-2xl p-5 mx-auto mt-16 small-scrollbar bg-gray-100 rounded-md shadow-sm h-[90%] overflow-y-scroll">
        <h1 className="my-3 text-3xl font-semibold text-gray-700 text-center">
          Định nghĩa
        </h1>
        <form onSubmit={handleSubmit}>
          <CreateWordInputSection
            label="Từ ngữ *"
            id="word"
            required
            maxLength={200}
            onChange={updateWord('word')}
            placeholder="xin mời nhập từ ngữ ở ô này"
            value={word}
            error={wordError}
            onFocus={resetError('wordError')}
          />

          <CreateWordTextAreaSection
            label="Định Nghĩa Từ *"
            textValue={definition}
            onFocus={resetError('definitionError')}
            onChange={updateWord('definition')}
            error={definitionError}
            id="definition"
          />

          <CreateWordTextAreaSection
            label="Ví Dụ *"
            textValue={example}
            onFocus={resetError('exampleError')}
            onChange={updateWord('example')}
            error={exampleError}
            id="example"
          />

          <CreateWordInputSection
            label="Thẻ từ *"
            id="tag"
            maxLength={500}
            onChange={updateWord('otherTags')}
            placeholder="#conga#convit"
            value={otherTags}
            pattern="^[a-zA-Z0-9#]*$"
          />

          <CreateWordYearSelector onChange={updateWord('createdYear')} />

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
                <CreateWordSuggestTag
                  onChange={updateWord('source')}
                  tagName="source"
                  defaultId="no-source"
                  name="source"
                />

                <div className="my-4 h-[1px] bg-gray-200" />

                <CreateWordSuggestTag
                  onChange={updateWord('trend')}
                  tagName="trend"
                  defaultId="no-trend"
                  name="trend"
                />
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
