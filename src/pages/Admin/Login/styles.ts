import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #4361ee;

  form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
    max-width: 40rem;

    input {
      background: #fff;
      border: 0.2rem solid #4cc9f0;
      border-radius: 999rem;
      height: 4.2rem;
      padding: 0 1.6rem;
      font-size: 1.6rem;
      font-weight: 700;
      color: #4cc9f0;
      outline: none;
    }

    button {
      height: 4.4rem;
      padding: 0 1.6rem;
      background: #4cc9f0;
      border: 0;
      color: #fff;
      font-size: 1.8rem;
      font-weight: 700;
      border-radius: 999rem;
      cursor: pointer;
      transition: all 0.2s ease-in;

      &:hover {
        background: #4cc9f099;
      }
    }
  }
`;
