import { Row } from "antd";
import styled from "styled-components";


export const WrapperCard = styled.div`
  *{
    margin: 0;
    padding: 0;
  }
  .title {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    font-size: 24px;
    color: #ff3300;
    padding: 10px;
    
  }
  .mainContainer {
    width:100%;
    background: #fff;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1rem));
    align-items: center;
    justify-content: space-between; 
    row-gap: 20px;
    padding: 20px;
  }

  .mainContainer .box {
    background: #fff;
    text-align: center;
    transition: .3s ease-in-out;
    max-width: 100%;
    cursor: pointer;
  }

  .mainContainer .box:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }

  .mainContainer .card {
    // padding: 15px 15px 0;
    width: auto;
  }

  .card .image {
    width:80%;
    backgroud: #f9f9f9;
    margin: 20px auto;
    position: relative;
  }

  // .card .image::before {
  //   content: "";
  //   position: absolute;
  //   width: 10px;
  //   height: 10px;
  //   botton: 8px;
  //   left: 10px;
  //   border-radius: 50%;
  //   background-color: red;
  // }

  .card .image:hover img {
    transform: scale(1.1);
  }

  .card .image img {
    width:90px;
    transition: .3s ease-in-out;
  }

  .card .desc {
    width: 100%;
    margin: auto;
    line-height: 3;
  }

  .card .desc h1 {
    font-size: 15px;
    text-transform: uppercase;
  }

  .card .desc p {
    font-size: 12px;
  }

  .card span {
    font-size: 15px;
  }

  .btn {
    width: 100%;
    padding: 12px 20px;
    margin-top: 15px;
    border: none;
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
  }

  .box .btn,
  .box .card .image::before {
    background: #ff3300;
  }

    .box .card span {
    color: #ff3300;
  }

  @media screen and (max-width: 998px) {
    .mainContainer{
      padding: 0 3rem;
    }

    .card .image {
      width: 50%
    }
  }

  @media screen and (max-width: 800px) {
    .mainContainer {
      grid-template-columns: repeat(auto-fit, minmax(100px, 600px));
      padding: 5rem 3rem;
    }
  }

  button#show-more {
    background: #fff;
    color: #ff3300;
    padding: 10px 20px;
    cursor: pointer;
    margin: 0 auto;
    display: block;
    transition: .3s ease-in-out;
    border-radius: 5%;
    font-size:15px;
    border: 1px #000;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  
  button#show-more:hover {
    background: #ff3300;
    color: #fff;
    border:none
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`