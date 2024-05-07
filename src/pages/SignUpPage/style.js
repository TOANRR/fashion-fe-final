import styled from "styled-components";

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
`

export const WrapperContainerLeft = styled.div`
    flex: 1;
    padding: 40px 45px 24px;
    display: flex;
    flex-direction: column;
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
`
export const WrapperTextLight = styled.span`
    color: rgb(13, 92, 182);
    font-size: 15px;
    cursor: pointer;
`
export const buttonStyle = {
    backgroundColor: '#db4437',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};