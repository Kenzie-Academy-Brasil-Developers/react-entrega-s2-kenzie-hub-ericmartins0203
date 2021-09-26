import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  margin: 0 auto;
  @media (min-width: 1000px) {
    flex: 2;
    flex-direction: row;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    display: flex;
    flex-direction: row;
    p {
      font-size: 18px;
      margin-right: 1rem;
    }
    .del {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: none;
      color: var(--red);
      font-weight: 700;
      font-size: larger;
      background: var(--black);
    }
  }

  .deslogar {
    position: absolute;
    right: 30px;
    top: 50px;
    background: ${(props) => (props.whiteSchema ? "#f5f5f5" : "#0c0d0d")};
    color: ${(props) => (props.whiteSchema ? "#0c0d0d" : "#f5f5f5")};
    height: 45px;
    border-radius: 8px;
    border: 2px solid var(--black);
    font-family: "Roboto Mono, monospace";
    margin-top: 16px;
    width: 100px;
    transition: 0.5s;
    font-weight: 700;
    font-size: larger;
    :hover {
      border: 2px solid #c85311;
    }
    @media (min-width: 1000px) {
      right: 50px;
      top: 50px;
      background-color: var(--orange);
    }
  }
`;
export const Background = styled.div`
  @media (min-width: 1000px) {
    flex: 1;
    background: url("https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV2ZWxvcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80")
      no-repeat center var(--black);
    background-size: contain;
  }
`;

export const Content = styled.div`
  padding: 0 5%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  margin-top: 1rem;
  @media (min-width: 1100px) {
    flex: 2;
  }
  div {
    margin-top: 30px;
    details {
      margin-top: 1rem;
      list-style: none;
      list-style-type: none;
      cursor: pointer;
      border: red;
      summary::-webkit-details-marker {
        display: none;
      }
    }
  }
`;

export const InputContainer = styled.form`
  flex: 1;
  margin-top: 32px;
  padding: 0 38px;
  input {
    margin-left: 1rem;
    background: transparent;
    align-items: center;
    flex: 1;
    border: 0;
    color: var(--black);
  }
  select {
    margin-left: 1rem;
    font-size: 16px;
    background: transparent;
    align-items: center;
    flex: 1;
    border: 0;

    color: var(--gray);
  }
  button {
    margin-left: 32px;
    max-width: 260px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: none;
    color: var(--white);
    background: var(--black);
    font-weight: 700;
    font-size: larger;
  }
`;

export const TaskContainer = styled.div`
  padding: 0 38px;
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  div {
    margin-top: 16px;
    margin-right: 32px;
  }
`;
