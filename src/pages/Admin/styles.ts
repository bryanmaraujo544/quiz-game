import styled from 'styled-components';

interface RoomCardProps {
  isSelected: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Rooms = styled.div`
  padding: 3.2rem;
  background: #4361ee;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;

  @media (max-width: 468px) {
    padding: 2.4rem;
  }

  .rooms-cards {
    display: flex;
    width: 100%;
    gap: 1.6rem;
    flex-wrap: wrap;
    margin-top: 3.2rem;
  }
`;

export const RoomCard = styled.div<RoomCardProps>`
  flex: 1;
  max-width: 35rem;
  width: 100%;
  min-width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  background: #fff;
  border: ${({ isSelected }) => (isSelected ? '3px solid #f72585' : '0')};
  transform: ${({ isSelected }) => (isSelected ? 'scale(1.03)' : 'scale(1)')};
  box-shadow: ${({ isSelected }) =>
    isSelected ? '0 .2rem 2rem #00000010' : '0'};
  padding: 2rem;
  border-radius: 1.2rem;

  p {
    font-size: 1.8rem;
    font-weight: 700;
    color: #4361ee;
  }

  .img-container {
    background: #4361ee;
    width: 100%;
    height: 6.4rem;
    border-radius: 0.8rem;

    img {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      border-radius: 0.8rem;
      object-fit: cover;
    }
  }

  button {
    border: 0;
    background: #4361ee;
    color: #fff;
    padding: 0.8rem 1.6rem;
    border-radius: 0.8rem;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      background: #4361ee99;
    }
  }
`;

export const AddQuestion = styled.form`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .alternatives {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;

    @media (max-width: 498px) {
      grid-template-columns: 1fr;
    }
  }

  .add-btn {
    border: 0;
    background: #f72585;
    height: 4.8rem;
    color: #fff;
    font-size: 1.8rem;
    font-weight: 700;
    border-radius: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      background: #f7258599;
    }
  }
`;

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .error {
    font-size: 1.2rem;
    color: #fff;
    font-weight: 500;
    margin-top: 0.4rem;
  }
`;

export const Input = styled.input`
  border: 0;
  background: #fff;
  height: 4.8rem;
  border-radius: 1.2rem;
  padding: 0 1.6rem;
  font-size: 1.6rem;
  font-weight: 700;
`;
