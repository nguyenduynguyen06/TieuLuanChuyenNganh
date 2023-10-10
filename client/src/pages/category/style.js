import styled from "styled-components";
import Card from "antd/es/card/Card";

export const CardWrapper = styled(Card)`

  {
    height: 150px;
  }

  p {
      font-size: 15px;
      margin-bottom: 15px;
      color: #000;
  }
  .centered-grid {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .img-fluid {
      padding-top: 20px;
      width: 20%;
      height: auto;
    }
  .img-fluid img{
      width: 150px;
      height: 150px;
} 
`