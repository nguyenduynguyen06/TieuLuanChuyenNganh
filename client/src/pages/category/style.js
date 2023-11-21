import styled from "styled-components";
export const Wrapper = styled.div`
  .background {
    padding: 10px;
    background-image: linear-gradient(to right, #5170ff,  #ff66c4);
    border-radius: 6px 6px 0 0;
  }
  .title{
    font-size: 22px;
    color: #fff;
    fontWeight: 600;
    text-transform: uppercase;
  }
`

export const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-auto-rows: minmax(min-content,max-content);
  grid-template-columns: repeat(auto-fit,minmax(0,1fr));
  overflow: hidden;
  border-radius: 0 0 8px 8px;
  border: 1px solid #000;
  height: auto;
  .card{
      width:100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      height: 200px;
      max-height: 200px;
  }
  .img-fluid {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70%;
    width: 100%;
  }
  .img{
    width: 40%;
  }
  .cate-name{
    height: 30%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;    
    color: #000;
    text-transform: uppercase;
    font-weight: 500;
  } 
  .card:hover {
    transform: scale(1);
    z-index:1;
    background: #9999ff;
  }

  @media screen and (max-width: 500px) {
      grid-template-columns: repeat(3,minmax(0,1fr));
      .card{
        max-height: 100px;
    }
      .cate-name{
        font-size: 12px;
      } 
  }
`