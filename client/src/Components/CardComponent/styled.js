import { Row } from "antd";
import styled from "styled-components";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

export const WrapperFilterCard = styled.div`
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
  // display: flex;
  // flex-wrap: wrap;
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
  align-items: center;
  overflow: hidden;
  justify-content: start;
  padding: 20px;
  border-radius: 0 0 8px 8px;
  gap: 2px;
}

.box {
  background: #fff;
  text-align: center;
  transition: .3s ease-in-out;
  max-width: 200px;
  width: 200px;
  border: 1px solid #efefef;
  border-radius: 4px;
}

.mainContainer .box:hover {
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}

.mainContainer .card {
  // padding: 15px 15px 0;
  width: 100%;
}

.card .image {
  width:100%;
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
  width:180px;
  transition: .3s ease-in-out;
  cursor: pointer;
}
.memory-button.selected {
  border: 1px solid #00BFFF	; 
}
.card .desc {
  width: 100%;
  margin: auto;
  line-height: 3;
  height: 20em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal
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
  padding: 12px 33px;
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

  .box .card p {
  color: #ff3300;
  font-size: 15px;
}

@media screen and (max-width: 998px) {
  .mainContainer{
    padding: 0 3rem;
    justify-content: center;
  }

  .card .image {
    width: 50%
  }
}

@media screen and (max-width: 1000px) {
  .mainContainer {
    grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
    padding: 5rem 3rem;
    column-gap: 6px;
  }
  .card .image img {
    width:90px;
    transition: .3s ease-in-out;
    cursor: pointer;
  }
  .mainContainer .box:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    transform: scale(1);
  }
  .card .image:hover img {
    transform: scale(1.3);
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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: hidden;
    padding: 20px;
    gap: 2px;
  }

  .mainContainer .box {
    background: #fff;
    text-align: center;
    transition: .3s ease-in-out;
    width: 200px;
  }

  .mainContainer .box:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }

  .mainContainer .card {
    // padding: 15px 15px 0;
    width: 100%;
  }

  .card .image {
    width:100%;
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
    width:180px;
    transition: .3s ease-in-out;
    cursor: pointer;
  }
  .memory-button.selected {
    border: 1px solid #00BFFF	; 
  }
  .card .desc {
    width: 100%;
    margin: auto;
    line-height: 3;
    height: 15em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal
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
    padding: 12px 33px;
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

    .box .card p {
    color: #ff3300;
    font-size: 15px;
  }

  @media screen and (max-width: 998px) {
    .mainContainer{
      padding: 0 3rem;
      justify-content: center;
    }

    .card .image {
      width: 50%
    }
  }

  @media screen and (max-width: 1000px) {
    .mainContainer {
      grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
      padding: 5rem 3rem;
      column-gap: 6px;
    }
    .card .image img {
      width:90px;
      transition: .3s ease-in-out;
      cursor: pointer;
    }
    .mainContainer .box:hover {
      box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
      transform: scale(1);
    }
    .card .image:hover img {
      transform: scale(1.3);
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
export const WrapperSuggestCard = styled.div`
.view-list{
  background-color: #fff;
  border: 1px solid rgba(145,158,171,.239);
  border-radius: 10px;
  padding: 5px 15px 0;
  width: 100%;
}
.view-list__wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.item{
  border-bottom: 0 solid rgba(145,158,171,.24);
  display: flex;
  gap: 15px;
  overflow: hidden;
  padding: 12px 0;
  transition: .2s ease-in-out;
  width: 100%;
}
.item__img{
  height: 100px;
  width: 100px;
  flex-shrink: 0;
}
img {
  display: block;
  height: auto;
  max-width: 100%;
  vertical-align: middle;
}
.item-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5px;
}
.item-name {
  color: #111;
  font-size: 16px;
  font-weight: 500;
}
.item-price {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  justify-content: space-between;
}
.box-info__box-price {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.product__price--show {
  color: #d70018;
  display: inline-block;
  font-size: 17px;
  font-weight: 500;
  line-height: 1;
}
.product__price--through {
  color: #707070;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  -webkit-text-decoration: line-through;
  text-decoration: line-through;
  top: 2px;
}
`
export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color:#fff;
    background: #ff3300
    span {
      color: #fff;
    }
  }
  width: 100%;
  text-align: center;
`