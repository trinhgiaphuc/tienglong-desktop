import * as React from 'react';
import * as ReactDOM from 'react-dom';

type PropsType = {
  children: React.ReactNode;
  setHideModal: React.Dispatch<React.SetStateAction<boolean>>;
  noClose?: boolean;
};

export default function Modal({
  children,
  setHideModal,
  noClose = false,
}: PropsType) {
  return ReactDOM.createPortal(
    <div
      onClick={() => (noClose ? undefined : setHideModal(true))}
      className="absolute font-ole z-50 top-0 left-0 h-screen w-screen overflow-hidden bg-gray-500 bg-opacity-50 backdrop-blur-sm select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-4 shadow-lg shadow-zinc-900 max-h-[500px] w-1/2 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-yellow-300"
      >
        {noClose ? null : (
          <button
            onClick={() => setHideModal(true)}
            className="p-2 h-8 w-8 ml-auto block rounded-full border border-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              viewBox="0 0 492 492"
            >
              <path d="M300 246 484 62a27 27 0 0 0 0-38L468 8a27 27 0 0 0-38 0L246 192 62 8a27 27 0 0 0-38 0L8 24a27 27 0 0 0 0 38l184 184L8 430a27 27 0 0 0 0 38l16 16a27 27 0 0 0 38 0l184-184 184 184a27 27 0 0 0 38 0l16-16a27 27 0 0 0 0-38L300 246z" />
            </svg>
          </button>
        )}
        <div className="max-h-[450px] p-2 overflow-y-scroll no-scrollbar">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
}
