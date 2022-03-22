import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  background: #4cc9f0;
  height: 100%;
  min-height: 100vh;
  padding: 4.8rem;

  h1 {
    font-size: 4.2rem;
    color: #fff;
  }

  .rooms {
    display: flex;
    gap: 1.6rem;
  }
`;

export const Room = styled.div`
  display: flex;
  gap: 3.2rem;
  flex: 1;
  max-width: 30rem;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 3.2rem;
  border-radius: 1.6rem;

  .img-container {
    background: #4361ee;
    width: 12.8rem;
    height: 12.8rem;
    border-radius: 1.6rem;
  }
  img {
    width: 100%;
    height: 100%;
    opacity: 0.5;
    border-radius: 1.6rem;
  }

  .room-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: #4361ee;
  }

  button {
    border: 0;
    background: #4361ee;
    padding: 1.2rem 3.2rem;
    border-radius: 99rem;
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #4cc9f0;
    }
  }
`;
