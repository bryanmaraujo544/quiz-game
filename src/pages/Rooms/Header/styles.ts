import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;

  @media (max-width: 468px) {
    flex-direction: column;
    gap: 1.6rem;
    margin-top: 1.6rem;
  }

  h1 {
    line-height: 0;
    color: #fff;
    font-size: 4.2rem;

    @media (max-width: 768px) {
      font-size: 3.6rem;
    }

    @media (max-width: 468px) {
      font-size: 2.8rem;
    }
  }

  .username-div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem;
    margin-top: 0.4rem;

    @media (max-width: 468px) {
      width: 100%;
    }

    .username {
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
    }

    .edit-icon {
      font-size: 1.8rem;
      color: #4361ee;
      margin-left: 0.8rem;
      cursor: pointer;
    }

    .form {
      display: flex;
      justify-content: flex-end;
      width: 100%;

      .input-username {
        padding: 0.4rem 1.6rem;
        border-radius: 999rem;
        border: 0;
        width: 100%;
        border: 0.2rem solid #4361ee;
        color: #4361ee;
        font-size: 1.8rem;
        font-weight: 700;
        outline: none;
      }

      button {
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        margin-left: 0.8rem;
        cursor: pointer;

        .check-icon {
          font-size: 2.8rem;
          color: #4361ee;
        }
      }
    }
  }
`;
