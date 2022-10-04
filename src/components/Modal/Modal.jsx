import { useCallback } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

const modalWrapper = document.getElementById('modal');

const Modal = ({ closeModalWindow, data }) => {
  const closeModal = useCallback(
    e => {
      if (e.code === 'Escape') {
        closeModalWindow();

        return;
      }
      if (e.target === e.currentTarget) {
        closeModalWindow();
      }
    },
    [closeModalWindow]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <div onClick={closeModal} className={css.overlay}>
      <div className={css.modal}>
        <img src={data.src} alt={data.tags} />
      </div>
    </div>,
    modalWrapper
  );
};

export default Modal;
