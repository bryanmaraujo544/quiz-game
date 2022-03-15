import styled from 'styled-components';

interface Props {
  isOpen: boolean;
}

export const Overlay = styled.div<Props>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000050;
`;

export const ModalContainer = styled.div`
  background: #fff;
  min-width: 30rem;
  width: 100%;
  max-width: 40rem;
  padding: 2.4rem;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 0;
    width: 100%;
    border-bottom: 1px solid #495057;

    h3 {
      font-size: 2rem;
      color: #495057;
    }

    .icon {
      font-size: 3rem;
      cursor: pointer;
      color: #495057;
    }
  }

  .body {
    width: 100%;
    margin-top: 1.2rem;
  }

  .buttons {
    display: flex;
    gap: 0.8rem;
    width: 100%;
    margin-top: 1.2rem;

    button {
      flex: 1;
      border: 0;
      border-radius: 1.2rem;
      padding: 1.2rem 0;
      color: #fff;
      font-size: 1.6rem;
      font-weight: 700;
      cursor: pointer;

      &:nth-child(1) {
        background: #fd0d0d;
      }

      &:nth-child(2) {
        background: #0074e0;
      }
    }
  }

  .result-board {
    display: flex;
    gap: 2rem;
    justify-content: center;
    padding: 2rem;
    width: 100%;

    .result {
      display: flex;
      flex-direction: column;
      align-items: center;

      &:nth-child(1) {
        color: #f72585;
      }

      &:nth-child(2) {
        color: #4361ee;
      }

      p {
        font-size: 2rem;
        font-weight: 700;
      }
    }
  }

  .reset-btn {
    border: 0;
    width: 100%;
    background: #4361ee;
    padding: 1.2rem 0;
    border-radius: 1.2rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    margin-top: 0.8rem;
    cursor: pointer;
  }
`;
