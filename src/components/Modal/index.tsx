import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { Overlay, ModalContainer } from './styles';

interface Props {
  children: any;
  title: string;
  isModalOpen: any;
  setIsModalOpen: any;
}

export const Modal = ({
  children,
  title,
  isModalOpen,
  setIsModalOpen,
}: Props) => {
  console.log('oi');

  return ReactDOM.createPortal(
    <Overlay isOpen={isModalOpen}>
      <ModalContainer>
        <div className="header">
          <h3>{title}</h3>
          <AiOutlineCloseCircle
            className="icon"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
        <div className="body">{children}</div>
      </ModalContainer>
    </Overlay>,
    document?.getElementById('modal-root') as any
  );
};
