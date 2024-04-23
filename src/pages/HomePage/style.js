import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: center;
    height: 44px;
    margin-left: 8%;
    color: #ffff;

`
export const WrapperTypeFeatured = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: center;
    font-size: 27px;
    margin-left: 8%;
    color: #ffff;
    padding-top: 14px;

`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #000000;
        span {
            color: #fff;
        }
    }
    width: 100%;
    color: rgb(11,116,229);
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`

export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top: 20px;
    padding-left: 50px
    flex-wrap: wrap;
`