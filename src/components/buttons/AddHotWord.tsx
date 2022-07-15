import * as React from "react";
import { uploadImage } from "../../lib/firebase";
import { useUser } from "../../lib/userContext";
// import { addHotWord } from "../../lib/api";
import { Modal } from "../commons";

export default function AddHotWord({ imgSrc = '', word }: { imgSrc?: string, word: number }) {
  const [hideModal, setHideModal] = React.useState(true);

  if (!hideModal) {
    return <OptionModal highlightNumber={word} setHideModal={setHideModal} />;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white bg-opacity-20 rounded-3xl bg-cover text-gray-800 cursor-pointer w-full h-64 my-2 hover:opacity-90 duration-300">
      <button
        onClick={() => {
          setHideModal(false);
        }}
        className="w-1/2 aspect-square"
      >
        {imgSrc.length > 0 ?
          <img src={imgSrc} className="w-full h-full" alt='highlight' />
          :
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 50 50"
          >
            <circle cx="25" cy="25" r="25" fill="#43b05c" />
            <path
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M25 13v25m13-13H13"
            />
          </svg>}
      </button>
    </div>
  );
}

function OptionModal(
  { setHideModal, highlightNumber }: {
    setHideModal: React.Dispatch<React.SetStateAction<boolean>>;
    highlightNumber: number
  },
) {
  const [word, setWord] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState('');
  const { user: { words = 0 } } = useUser();

  function handlePreviewImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files[0];
    console.log(f.size);

    if (f.size > 320000) {
      setError('Kích thước ảnh quá lớn, xin hãy giảm kích thước phù hợp (<300kb)');
      return;
    } else {
      if (error.length > 0) setError('');
      const src = URL.createObjectURL(f);
      const image = document.getElementById('preview-image') as HTMLImageElement;
      const submitBtn = document.getElementById('submit-image') as HTMLButtonElement;

      image.src = src;
      image.hidden = false;
      submitBtn.hidden = false;
      setFile(f);
    }
  }

  async function handFileUpload() {
    await uploadImage(file, String(highlightNumber));
  }

  return (
    <Modal setHideModal={setHideModal}>
      <div>
        <h1 className="text-lg text-center p-2 uppercase font-medium mb-6">
          Xin mời bạn chọn {word ? "Từ trong danh sách từ của bạn" : ""}:
        </h1>
        {word
          ? (
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 mb-4 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          )
          : null}
        <div className="h-full w-full flex items-center justify-center gap-4">
          <button
            disabled={words < 1}
            onClick={() => setWord(true)}
            type="button"
            className={`mb-2 w-full inline-block px-6 py-3 ${words > 1 ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' : 'bg-zinc-500'} text-white font-medium text-sm leading-normal uppercase rounded shadow-md `}
          >
            {words < 1 ? 'Bạn không có từ nào để thêm' : 'Thêm Từ'}
          </button>
          {word
            ? null : (
              <input
                onChange={handlePreviewImage}
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                className="mb-2 w-full inline-block px-6 py-3 cursor-pointer bg-blue-600 text-white font-medium text-sm leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              />
            )}
        </div>
        {error.length > 0 ?
          <p className="bg-red-300 p-2 text-center text-xl">
            {error}
          </p> : null}
        <div className="flex items-center gap-2 justify-center">
          <img width={300} height={300} alt="preview pic" hidden src="/asdas" id='preview-image' />
          <button hidden className="bg-green-400 p-2 border border-zinc-700" id="submit-image" onClick={handFileUpload}>
            tải ảnh
          </button>
        </div>
      </div>
    </Modal>
  );
}
