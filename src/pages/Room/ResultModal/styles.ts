import styled from 'styled-components';

export const ResultBoard = styled.div`
  .result-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 2rem;
    width: 100%;

    .results {
      display: flex;
      gap: 2rem;
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
    gap: 0.4rem;
    overflow-y: scroll;

    .user {
      font-size: 1.4rem;
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
