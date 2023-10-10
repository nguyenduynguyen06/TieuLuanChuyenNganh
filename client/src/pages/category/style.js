import styled from "styled-components";
import Card from "antd/es/card/Card";

export const CardWrapper = styled(Card)`
p {
    font-size: 15px;
    margin-bottom: 15px;
    color: #FF3300;
}
.centered-grid {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-fluid {
    width: 50%;
    height: auto;
  }
.img-fluid img{
    width: 200px;
    height: 200px;
} 
`