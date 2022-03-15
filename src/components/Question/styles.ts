import styled from 'styled-components';

interface Props {
  isLarge: boolean;
}

interface AltProps {
  isCorrect?: boolean;
  clicked?: boolean;
  isSelected?: boolean;
}

export const Container = styled.div<Props>`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .question-container {
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    .question {
      font-size: ${({ isLarge }) => (isLarge ? '2rem' : '3.2rem')};
      font-weight: 700;
      color: #3a0ca3;
    }
  }

  .alternatives {
    display: flex;
    gap: 1.6rem;
    padding: 2.4rem 1.2rem;
    cursor: pointer;
  }
`;

export const Alternative = styled.div<AltProps>`
  border-radius: 0.8rem;
  padding: 2.4rem 0.8rem;
  flex: 1;
  color: #fff;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  background: #f72585;

  &:hover {
    background: #4cc9f0;
  }
`;
