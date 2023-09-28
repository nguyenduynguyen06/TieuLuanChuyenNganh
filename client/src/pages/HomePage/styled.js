import { Row } from "antd";
import styled from "styled-components";

export const WrapperHomePage = styled(Row)`
width: 100%;
height:100%;
overflow: hidden;
overflow-x: hidden
`

export const WrapperNa = styled.div`
display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;
    color: #fff;
    font-size: 12px; 
    font-weight: bold; 
    height: 40px;
`

export const CardContainer = styled.div`
//   width: 100%; /* Chiều rộng tùy thuộc vào phần tử cha */
//   padding-top: 100%; /* Tỉ lệ 4:3 */
  position: relative;
  display: flex;

`;

export const CardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

`;
