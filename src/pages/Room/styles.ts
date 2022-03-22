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
    position: relative;
    display: flex;
    gap: 2rem;
    justify-content: center;
    padding: 2rem;
    padding-bottom: 3.2rem;
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

    .home-button {
      position: absolute;
      bottom: 0;
      background: #fff;
      padding: 0.6rem 1.2rem;
      font-size: 1.4rem;
      font-weight: 700;
      border-radius: 0.8rem 0.8rem 0 0;
      cursor: pointer;
      transition: color 0.2s ease-in;

      &:hover {
        color: #4361ee;
      }
    }
  }
`;
