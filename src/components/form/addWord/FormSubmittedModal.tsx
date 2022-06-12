import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { WordAction } from '../../../pages/define';
import { Modal } from '../../commons';

export default function FormSubmittedModal({
  setHideModal,
  dispatch,
}: {
  setHideModal: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<WordAction>;
}) {
  const navigate = useNavigate();

  return (
    <Modal noClose={true} setHideModal={setHideModal}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-center font-bold">Tạo Từ Thành Công</h1>
        <p className="text-lg font-bold">
          Từ của bạn đã được tạo và đang trong quá trình kiểm duyệt, mong bạn
          chờ trong giây lát nhé.
        </p>
        <div className="flex items-center justify-evenly">
          <button
            className="p-2 border border-black rounded-lg font-bold"
            onClick={() => {
              dispatch({ type: 'RESET_ALL' });
              setHideModal(true);
            }}
          >
            Tạo từ mới
          </button>
          <button
            className="p-2 border border-black rounded-lg font-bold"
            onClick={() => navigate('/main_window', { replace: true })}
          >
            Trở về trang chủ
          </button>
        </div>
      </div>
    </Modal>
  );
}
