import { useState } from 'react';
import ReactDOM from 'react-dom';

import { Modal } from '../../../components/Modal';
import { Container, Text, Button } from './styles';

interface Props {
  isWaiting: boolean;
}

export const WaitingModal = ({ isWaiting }: Props) => {
  return ReactDOM.createPortal(
    <Container isWaiting={isWaiting}>
      <Text>Wait end of the quiz</Text>
    </Container>,
    document?.getElementById('modal-root') as any
  );
};
