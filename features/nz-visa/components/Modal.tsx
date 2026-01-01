
import React from 'react';
import { ModalInfo } from '../types';

interface ModalProps {
  modalInfo: ModalInfo;
  onHide: () => void;
}

export const Modal: React.FC<ModalProps> = ({ modalInfo, onHide }) => {
  const { isOpen, message, isConfirm, onConfirm } = modalInfo;

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onHide();
    }
  };

  return (
    <div className="modal-enter fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="modal-overlay absolute inset-0 bg-black/40 dark:bg-black/70" onClick={onHide}></div>
    <div className="modal-dialog relative z-[101] bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6 text-center transform transition-all">
      <p className="text-slate-700 dark:text-slate-200 text-lg mb-6">{message}</p>
      <div className="flex justify-center gap-4">
        <button onClick={handleConfirm} className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500">
          {isConfirm ? 'Confirm' : 'OK'}
        </button>
        {isConfirm && (
          <button onClick={onHide} className="bg-slate-200 text-slate-700 font-semibold py-2 px-6 rounded-lg hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500">
            Cancel
          </button>
        )}
      </div>
    </div>
  </div>
  );
};
