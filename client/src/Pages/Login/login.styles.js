import styled from 'styled-components';

const ImageContainer = styled.div`
  margin: 20px;
  padding: 20px;
  img {
    max-width: 100vw;
  }
  @media (max-width: 820px) {
    padding: 0px;
    margin: 0px;
  }
  display: flex;
`;
const LoginContainer = styled.div`
  background-color: whitesmoke;
  display: flex;
  height: 100vh;
  width: 100vw;
  @media (max-width: 820px) {
    flex-direction: column;
  }
`;
const LoginFieldContainer = styled.div`
  padding: 20px;
`;
const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  min-height: 270px;
`;
const RightContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  justify-items: center;
  //   flex-direction: column;
`;
export {
  LoginContainer,
  LoginFieldContainer,
  FormContainer,
  RightContainer,
  ImageContainer,
};
