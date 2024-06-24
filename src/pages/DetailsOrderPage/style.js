import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 13px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
  }
  .address,.phone-info,.delivery-info,.delivery-fee,.payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    margin-top: 8px;
  }
  .name-delivery {
    color: rgb(234, 133, 0); 
    font-weight: bold;
    text-transform: uppercase;
  }
  .status-payment {
    margin-top: 8px;
    color: rgb(234, 133, 0); 
  }
`

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 15px;
`
export const WrapperLabelCode = styled.div`
  color: rgb(36, 36, 36);
  font-size: 15px;
  text-transform: uppercase;
  margin-bottom: 15px;
  font-weight: 600;
`
export const WrapperContentInfo = styled.div`
  height: 118px;
  width: 320px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
`

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const WrapperProduct = styled.div`
  display:flex;
  align-items:flex-start;
  margin-top: 10px;
`

export const WrapperNameProduct = styled.div`
  display:flex;
  align-items: flex-start;
  font-weight: bold;
  width: 470px;
`

export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  &:last-child {
    color: red
  }
`
export const WrapperItemLabel = styled.div`
  width: 200px;
  &:last-child {
    font-weight: bold;
  }
`

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end
`

export const WrapperWatermark = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px; /* Điều chỉnh kích thước của khung */
    height: 150px;
    border-radius: 50%; /* Tạo khung tròn */
    background-color: rgba(255, 0, 0, 0.1); /* Màu nền */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: red; /* Màu chữ đỏ */
    font-weight: bold; /* Chữ đậm */
    font-style: italic; /* Chữ nghiêng */
    // transform: rotate(-45deg); /* Độ nghiêng */
`;