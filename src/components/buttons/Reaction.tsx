import * as React from 'react';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import { auth, checkWordIsLiked } from '../../lib/firebase';

export default function Reaction({ wordId, authorId }: { wordId: string, authorId: string }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);

  React.useEffect(() => {
    if (auth.currentUser) {
      checkWordIsLiked(wordId, auth.currentUser.uid).then(setIsLiked);
    }
  }, []);


  function handleReactWord() {
    if (!isLiked) {
      setIsLiked(true);
      window.electron.ipcRenderer.sendMessage('add-heart', [{ authorId, wordId, type: 'heart' }]);
    } else {
      window.electron.ipcRenderer.sendMessage('remove-heart', [{ authorId, wordId, type: 'unheart' }]);
      setIsLiked(false);
    }
  }

  return (
    <div className="flex justify-start w-full m-1 p-2">
      <button onClick={handleReactWord} className="transition ease-out duration-300 hover:bg-red-500 border border-red-400 text-red-500 hover:text-black bg-transparent h-10 w-10 p-2 ml-2 flex items-center justify-center rounded-full cursor-pointer" >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isLiked ? "red" : "none"}
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
          ></path>
        </svg>
      </button>

      <button onClick={() => setOpenShare(p => !p)} className="transition ease-out duration-300 hover:bg-blue-500 bg-transparent text-blue-500 hover:text-black border border-blue-500 w-10 h-10 p-2 flex items-center justify-center rounded-full  cursor-pointer mr-5 ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M9 13a3 3 0 0 0 0-2m0 2a3 3 0 1 1 0-2m0 2 6 4m-6-6 6-4m0 0a3 3 0 1 0 6-2 3 3 0 0 0-6 2zm0 10a3 3 0 1 0 6 2 3 3 0 0 0-6-2z" />
        </svg>
      </button>

      {openShare ? <div className="rounded-lg flex gap-2">
        <FacebookShareButton url={`https://tienglong.vercel.app/word/${wordId}`}>
          <FacebookIcon className="h-10 w-10 rounded-full" />
        </FacebookShareButton>
        <TwitterShareButton url={`https://tienglong.vercel.app/word/${wordId}`}>
          <TwitterIcon className="h-10 w-10 rounded-full" />
        </TwitterShareButton>
      </div>
        : null}

      <button className="transition ease-out duration-300 hover:bg-white bg-transparent border border-black w-10 h-10 p-2 flex items-center justify-center rounded-full  cursor-pointer mr-5 ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 60"
          xmlSpace="preserve"
        >
          <path fill="#ff4400" d="M54 36H8V4h46L44 20z" />
          <path d="M7 0 6 1v58a1 1 0 1 0 2 0V1L7 0z" fill="#000" />
        </svg>
      </button>
    </div>
  );
}
