import styled from 'styled-components';

interface UserProps {
  index: number;
  length: number;
}

export const ResultBoard = styled.div`
  .result-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.6rem;
    width: 100%;

    .results {
      display: flex;
      gap: 2rem;
      width: 100%;
      justify-content: center;
      margin-top: 0.4rem;
      padding-bottom: 1.6rem;
      border-bottom: 1px solid #ced4da;
    }

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

  .ranking {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 0.8rem;
    overflow-y: scroll;
    margin-bottom: 3.2rem;

    .user {
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
  .title {
    font-size: 2.2rem;
    margin: 0.8rem 0;
  }
`;

export const User = styled.p<UserProps>`
  font-size: 1.6rem;
  font-weight: 600;
  color: #495057;
  /* font-size: ${({ index }) => `${index}rem`}; */

  &:nth-child(2) {
    background-color: #f72585;
    background-image: linear-gradient(45deg, #f72585, #4361ee);
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    font-size: 2rem;
    font-weight: 700;
  }
`;
