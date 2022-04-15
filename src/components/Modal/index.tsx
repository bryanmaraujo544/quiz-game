import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { Overlay, ModalContainer } from './styles';

interface Props {
  children: any;
  title: string;
  isModalOpen: any;
  handleCloseModal: any;
  delayToOpen?: number;
  style?: any;
}

const overlayVariants = (delay?: number) => ({
  hidden: {
    transition: {
      when: 'afterChildren',
      duration: 0.1,
    },
    opacity: 0,
    display: 'none',
  },
  show: {
    transition: {
      delay: delay || 0,
      when: 'beforeChildren',
      duration: 0.1,
    },
    opacity: 1,
    display: 'flex',
  },
});

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
  },
};

export const Modal = ({
  children,
  title,
  isModalOpen,
  handleCloseModal,
  delayToOpen,
  style,
}: Props) => {
  const overlayControls = useAnimation();

  useEffect(() => {
    if (isModalOpen) {
      overlayControls.start('show');
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    } else {
      overlayControls.start('hidden');
    }
  }, [isModalOpen]);

  function closeModal() {
    handleCloseModal();
    overlayControls.start('hidden');
  }

  return ReactDOM.createPortal(
    <Overlay
      isOpen={isModalOpen}
      as={motion.div}
      variants={overlayVariants(delayToOpen)}
      animate={overlayControls}
      style={style}
    >
      <ModalContainer as={motion.div} variants={modalVariants} style={style}>
        <div className="header">
          <h3>{title}</h3>
          <AiOutlineCloseCircle className="icon" onClick={() => closeModal()} />
        </div>
        <div className="body">{children}</div>
      </ModalContainer>
    </Overlay>,
    document?.getElementById('modal-root') as any
  );
};
