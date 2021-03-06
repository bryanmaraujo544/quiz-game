import styled from 'styled-components';

interface UserProps {
  index: number;
  length: number;
}

export const ResultBoard = styled.div`
  /* height: 100%; */
  flex: 1;
  h3 {
    font-size: 2.4rem;
    color: #212529;
    margin-bottom: 1rem;
  }
  .result-board {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.6rem 0;
    width: 100%;

    .results {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      width: 100%;
      justify-content: flex-start;
      align-items: flex-start;
      margin-top: 0.4rem;
      padding-bottom: 2.4rem;
    }

    .result {
      display: flex;
      align-items: center;

      &:nth-child(1) {
        color: #f72585;
      }

      &:nth-child(2) {
        color: #495057;
      }

      p {
        font-size: 1.8rem;
        font-weight: 600;
      }
    }
  }

  .ranking {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    gap: 0.6rem;
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
    transition: all 0.1s linear;

    &:hover {
      background-color: #f72585;
    }
  }
`;

export const User = styled.p<UserProps>`
  font-size: 1.6rem;
  font-weight: 600;
  color: #495057;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: center;

  &:nth-child(2) {
    color: #f72585;
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

  .arrow-icon {
    font-size: 2rem;
    margin-top: 0.1rem;
    margin-left: 0.4rem;
    color: #4361ee;
  }

  .correct-answers {
    color: #495057;
    /* color: #f72585; */
    margin-left: 0.8rem;
  }

  .time {
    color: #495057;
    display: flex;
    align-items: center;
  }
`;

export const CongratsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: #f72585;
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
  z-index: 99999;

  .congrats-text {
    font-size: 4.2rem;
    text-align: center;
    color: #fff;
    font-weight: 700;

    @media (max-width: 468px) {
      font-size: 3.6rem;
    }

    .winner {
      color: #4361ee;
    }
  }
`;
