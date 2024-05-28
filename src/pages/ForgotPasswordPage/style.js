import styled from 'styled-components';
import { Button } from 'antd';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  padding: 20px; // Added padding for better spacing on mobile devices
`;

export const FormContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #000000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px; // Adjust padding for smaller screens
  }

  @media (max-width: 480px) {
    padding: 15px; // Further adjust padding for very small screens
  }
`;

export const StyledButton = styled(Button)`
  background-color: #000000;
  color: #ffffff;
  border: none;

  &:hover {
    background-color: #333333;
    color: #ffffff;
  }

  &:focus {
    background-color: #000000;
    color: #ffffff;
  }

  @media (max-width: 480px) {
    width: 100%; // Make button full width on very small screens
  }
`;

export const Title = styled.h2`
  text-align: center;
  color: #000000;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    margin-bottom: 30px; // Adjust margin for smaller screens
    font-size: 1.5em; // Adjust font size for smaller screens
  }
`;

export const FormItem = styled.div`
  width: 100%;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    margin-bottom: 12px; // Adjust margin for very small screens
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 480px) {
    justify-content: center; // Center buttons on very small screens
  }
`;
