import styled from 'styled-components';

interface Props {
  isWaiting: boolean;
}

export const Container = styled.div<Props>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${({ isWaiting }) => (isWaiting ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #00000090;
  gap: 1.6rem;
  padding: 1.2rem;
`;

export const Text = styled.p`
  font-size: 3.6rem;
  background-color: #000;
  padding: 2rem 4rem;
  border-radius: 1.2rem;
  font-weight: 700;
  color: #fff;
`;

export const Button = styled.div`
  background: #fff;
  width: 100%;
  max-width: 25rem;
  padding: 1.6rem;
  border-radius: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
  }
`;
