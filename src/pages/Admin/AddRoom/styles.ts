import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #4361ee;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.2rem;

  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  h1 {
    color: #fff;
    font-size: 2.8rem;
    align-self: center;
    /* margin: auto; */
    /* background-color: red; */
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 2.4rem;
  flex: 1;
`;

export const Input = styled.input`
  width: 100%;
  height: 4.2rem;
  padding: 0 1.6rem;
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 1.2rem;
  border: 0;
  outline: 0;
  color: #4361ee;

  &:focus {
    outline: 2px solid #f72585;
  }
`;

export const Button = styled.button`
  height: 4.2rem;
  font-size: 1.8rem;
  font-weight: 700;
  background: #f72585;
  color: #fff;
  border: 0;
  border-radius: 1.2rem;
  padding: 0 1.6rem;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:hover {
    background: #ff2999;
  }
`;
