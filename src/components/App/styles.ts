import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const QuestionBoard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;

  .result-board {
    display: flex;
    gap: 2rem;
    justify-content: center;
    padding: 2rem;
    background-color: #4cc9f0;
    width: 100%;
    max-width: 30rem;
    border-radius: 0 0 1.6rem 1.6rem;

    .result {
      display: flex;
      flex-direction: column;
      align-items: center;

      &:nth-child(1) {
        color: #fff;
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
`;
