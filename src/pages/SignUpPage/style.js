import styled from "styled-components";
import background from '../../assets/images/background.avif'
import { Image } from "antd";

export const WrapperCover = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('https://help.fanruan.com/finereport-en10.0/uploads/20201230/1609295170644784.gif'); 
    height: 100vh;
    background-size: cover;
    background-position: center;
    // filter: blur(1px);
    // z-index:1;
    @media (max-width: 768px) {
        padding: 20px;
        height: 120vh;
        
    }
`

export const WrapperContainerLeft = styled.div`
    flex: 1;
    padding: 40px 45px 24px;
    display: flex;
    flex-direction: column;
    // filter: blur(1px);
    // z-index:10;
    @media (max-width: 768px) {
        padding: 20px;
    }
    
    
`

export const WrapperContainerRight = styled.div`
    width: 370px;
    // background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
    background: #000000;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    @media (max-width: 768px) {
        width:100%;
       
    }
`
export const WrapperTextLight = styled.span`
    color: rgb(13, 92, 182);
    font-size: 15px;
    cursor: pointer;
    @media (max-width: 768px) {
        font-size: 12px;
    }
`
export const ButtonStyle = styled.button`
    background-color: #db4437;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 12px;
    }
`;

export const ResponsiveImage = styled(Image)`
    height: 203px;
    width: 203px;

    @media (max-width: 768px) {
        height: 80px;
        width: 80px;
    }
`;
export const ResponsiveContainer = styled.div`
  width: 800px;
  height: 445px;
  border-radius: 6px;
  background: #fff;
  display: flex;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    flex-direction: column;
  }
`;