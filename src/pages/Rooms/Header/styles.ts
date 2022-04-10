import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .username-div {
    display: flex;
    justify-content: flex-end;
    padding: 0.4rem;
    .username {
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
    }
    .form {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      .input-username {
        padding: 0.8rem 1.6rem;
        border-radius: 999rem;
        border: 0;
        width: 15rem;
        text-align: right;
        background: #4361ee;
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
        outline: none;
        /* max-width: 100px; */
      }
    }
  }
`;
