import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`

export const WrapperLeft = styled.div`
  width: 910px;
`

export const WrapperListOrder = styled.div`
`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
`

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`
export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex ;
  flex-direction: column; 
  gap: 10px; 
  align-items: center
`

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 90%
`

export const WrapperTotal = styled.div`
    display: flex;
    align-items: flex-start; 
    justify-content: space-between;
    padding: 17px 20px;
    background: #fff ;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    width: 90%
`
export const WrapperStyleHeaderDilivery = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  };
  margin-bottom: 4px;
`
export const Wrapper = styled.div`
  width: 390px;
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 1100px) {
    width: 240px;
    // flex-direction: column;
    // align-items: flex-start;
  }
`;

export const ResponsiveImage = styled.img`
  width: 77px;
  height: auto;
  object-fit: cover;

  @media (max-width: 1100px) {
    width: 40px ;
    height: auto;
  }
`;

export const ResponsiveLink = styled.a`
  width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; /* Chuyển từ nowrap thành normal */
  word-wrap: break-word; /* Thêm dòng này để từ dài không bị cắt ngang */
  text-decoration: none;
  color: inherit;
  display: block;

  @media (max-width: 1100px) {
    width: 120px;
    font-size: 12px;
  }
`;
export const Container = styled.span`
  display: inline-block;
  width: 390px;

  @media (max-width: 1100px) {
    width: 240px;
  }
`;

export const ResponsiveText = styled.span`
  display: inline-block;
  margin-left: 8px;

  @media (max-width: 1100px) {
    margin-left: 4px;
  }
`;
export const ProductLink = styled.a`
  width: 260px; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; /* Chuyển từ nowrap thành normal */
  word-wrap: break-word; /* Thêm dòng này để từ dài không bị cắt ngang */
  margin-left: 10px;
  height: 70px;
  display: -webkit-box; /* Thêm các dòng này để hỗ trợ hiển thị đa dòng */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Số lượng dòng tối đa mà bạn muốn hiển thị */
  text-decoration: none;
  color: inherit;
`;