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
  display: flex;
  flex-direction: column;
  flex: 1;
  background: orange;
  width: 100%;

  .question-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    .question {
      font-size: ${({ isLarge }) => (isLarge ? '2rem' : '3.2rem')};
      font-weight: 700;
      color: #3a0ca3;
      text-align: center;

      @media (max-width: 468px) {
        font-size: ${({ isLarge }) => (isLarge ? '1.6rem' : '2.4rem')};
      }
    }
  }

  .alternatives {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.6rem;
    padding: 2.4rem 1.2rem;
    cursor: pointer;

    @media (max-width: 1072px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 468px) {
      gap: 1.2rem;
    }
    /* 
    @media (max-width: 280px) {
      grid-template-columns: 1fr;
    } */
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
  text-align: center;

  @media (max-width: 468px) {
    padding: 1.6rem 0.4rem;
    font-size: 1.6rem;
  }

  &:hover {
    background: #4cc9f0;
  }
`;
