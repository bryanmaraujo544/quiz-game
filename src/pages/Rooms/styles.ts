import styled from 'styled-components';

interface RoomProps {
  isFull: boolean;
}

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
    flex-wrap: wrap;
    gap: 1.6rem;

    .rooms-loading {
      margin-top: 3.2rem;
    }
  }
`;

export const Room = styled.div<RoomProps>`
  display: flex;
  gap: 3.2rem;
  /* max-width: 30rem; */
  max-width: 100%;
  width: 30rem;
  min-width: 20rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 3.2rem;
  border-radius: 1.6rem;

  .room-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: #4361ee;
    text-align: center;
    display: flex;
    align-items: center;
    height: 4.2rem;
  }

  .img-container {
    position: relative;
    background: #4361ee;
    width: 100%;
    height: 12.8rem;
    border-radius: 1.6rem;
    /* flex: 1; */

    img {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      border-radius: 1.6rem;
      object-fit: cover;
    }
  }

  .people-amount {
    position: absolute;
    left: 50%;
    bottom: -1.2rem;
    transform: translateX(-50%);
    font-size: 1.8rem;
    font-weight: 700;
    background: #fff;
    color: ${({ isFull }) => (isFull ? '#6C757D' : '#4361ee')};

    padding: 0.4rem 1.6rem;
    border-radius: 99rem;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    background: ${({ isFull }) => (isFull ? '#ccc' : '#4361ee')};
    width: 100%;
    height: 4.8rem;
    border-radius: 99rem;
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    cursor: ${({ isFull }) => (isFull ? 'not-allowed' : 'pointer')};
    transition: background 0.2s ease;

    &:hover {
      background: ${({ isFull }) => (isFull ? '#ccc' : '#4cc9f0')};
    }
  }
`;
