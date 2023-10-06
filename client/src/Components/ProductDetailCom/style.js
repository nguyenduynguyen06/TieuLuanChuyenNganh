import {Col, Image, InputNumber, Row, Table } from "antd";
import styled from "styled-components";

export const WrapperStyleImageBig = styled(Image)`
    height: 100%;
    width: 100%;
`
export const WrapperStyleImageSmall = styled(Image)`
    height: 100px;
    width: 100px;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`
export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36,36,36);
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;
`
export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`
export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
`
export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px;
`

export const WrapperAddressProduct = styled.div`
    span.address{
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl;
    };
    span.change-address{
        color: rgb(11,116,229);
        font-size:  16px;
        line-height: 24px;
        font-weight: 500;
    }
`
export const WrapperQuantityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 120px;
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        &.ant-input-number-handler-wrap {
            display: none !important;
        }
    }
    
`

export const WrapperPropTable = styled(Table)`
`
export const WrapperSeeMore = styled.div`
    padding-top: 30px;
    color: #0492c2;
`
export const WrapperDesc = styled.div`
    .product-description {
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
    .product-image {
        max-width: 100%;
        height: auto;
        width: auto;
      }
`

export const WrapperButton = styled(Col)`
      .btn {
        background: #fff;
        color: #ff3300;
        border: 1px solid #ff3300;
      }
      .btn:hover {
        background: #ff3300;
        color: #fff;
      }
      
`
export const WrapperTextBox = styled(Col)`
      .textbox {
        border-radius: 5px;
        border: 1px solid #ccc;
        transition: .5s ease-in-out;
        padding: 10px;
    }
`
export const WrapperInfo = styled(Row)`
    .nameinput {
        border-radius: 5px;
        border: 1px solid #ccc;
        transition: .5s ease-in-out;
        margin-right: 20px;
        padding: 10px;
    }
    .label {
        font-size: 14px;
    }
    .checkbox{
        margin-left: 7px;
    }
`
export const WrapperComment = styled(Row)`
    .singlecmt .name{
        margin-bottom:0px;
        color: #ff3300;
        font-weight: '700'
    }
    .singlecmt .content{
        font-size: 15px;
        margin-bottom:2px;
        font-style: italic;
    }
    .singlecmt button{
        background: white;
        border: none;
        margin-left:10px;
        
    }
`