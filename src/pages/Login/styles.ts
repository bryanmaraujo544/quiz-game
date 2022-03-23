import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: #f72585;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  justify-content: center;
  align-items: center;

  h1 {
    color: #fff;
    font-size: 2.4rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`;

export const Input = styled.input`
  background: #fff;
  padding: 1.6rem;
  width: 100%;
  max-width: 40rem;
  border-radius: 999rem;
  border: 3px solid #4361ee;
  font-size: 1.6rem;
  color: #4361ee;
  outline: none;
  font-weight: 700;

  &::placeholder {
    font-size: 1.6rem;
    color: #4361ee;
    font-weight: 700;
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 40rem;
  padding: 1.6rem;
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 999rem;
  border: 0;
  background: #4361ee;
  color: #fff;
  cursor: pointer;
  transition: background 0.1s ease-in;

  &:hover {
    background: #4cc9f0;
  }
`;
