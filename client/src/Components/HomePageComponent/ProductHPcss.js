import styled from "styled-components";

export const ProductHPStyle = styled.div`

    .container-pd {
        display: flex;
        overflow-x: auto; 
        scrollbar-width: none; 
        gap: 1%;
        flex-wrap: nowrap;
        padding: 10px;
    }
    .item-label{
      height: 22px;
      text-align: left;
      margin-bottom: 20px;
    }
    .lb-dis {
      background-color: #980300;
      color: #fff;
      font-weight: 400;
    }
    .lb-dis span{
        font-size: 5px;
    }
    .item-label span {
      border-radius: 8px;
      display: inline-block;
      margin-right: 4px;
      padding: 4px 8px;
      text-align: left;
    }
    .name{
        padding: 5px; 
        text-overflow: ellipsis;
        max-width: 100%; 
        overflow: hidden;
        white-space: nowrap;
    }
    .card-wrapper {
      margin-right: 16px;
    }
  .card {
    background: #fff;
    text-align: center;
    transition: .3s ease-in-out;
    border: 1px solid #efefef;
    min-height: 350px;
    min-width: 200px;
    border-radius: 4px;
    border-bottom: 1px solid #f3f3f3 !important;
    border-right: 1px solid #f3f3f3 !important;
    padding: 10px 15px 20px;
    overflow: hidden;
    width: 200px;
    height: auto;
    display: inline-block; 
  }
  .div-img{
    margin-top: 20px;
  }
  .card:hover{
    transform: scale(1);
    z-index:1;
    box-shadow: 0 4px 8px #000, 0 6px 20px #000;
  }

  .card .image {
    padding: 5%;
    width:100%;
    position: relative;
  }

  .card .image:hover img {
    transform: scale(1.1);
    z-index:1;
  }

  .card .image img {
    width: 100%;
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
    font-size: 15px;
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

  .card .btn,
  .card .image::before {
    background: #ff3300;
  }

  .card p {
    color: #ff3300;
    font-size: 15px;
  }

`
