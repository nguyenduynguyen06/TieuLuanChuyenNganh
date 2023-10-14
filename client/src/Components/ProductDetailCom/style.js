import { Col, Image, InputNumber, Row, Table } from "antd";
import styled from "styled-components";

export const WrapperStyleImageBig = styled.div`
display: flex;
justify-contents: center;
    .slider-image {
        display: block;
        object-fit: contain;
        max-width: 100%;
        max-height: 400px;
    }
    .slider-image img{
        width: auto;
        height: 400px;
    }
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
        border: none;
        transition: .5s ease-in-out;
        margin-right: 20px;
        padding: 10px;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);
        width: auto;
        
    }
    .label {
        font-size: 14px;
    }
    .checkbox{
        margin-left: 7px;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);

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
export const WrapperCommentNew = styled.div`
    .comment-container {
        background-color: #f9fafb;
        border-radius: 10px;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);
        margin-top: 15px;
        padding: 10px;
        width: 100%;
    }
    .comment-form{
        display: block;
    }
    .comment-container .comment-form-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .comment-container .textarea-comment {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        position: relative;
        width: 100%;
    }
    .comment-container .textarea-comment .icon-img {
        left: 10px;
        top: 10%;
        position: absolute;
        z-index: 1;
    }
    .comment-container .textarea-comment .icon-img img{
        height: auto;
        max-width: 100%;
    }
    .comment-container .textarea-comment .textarea {
        border: 0;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);
        min-width: 0!important;
        padding-left: 85px;
        width: calc(100%-80px);
    }
    .textarea:not([rows]) {
        max-height: 40em;
        min-height: 8em;
    }
    .textarea {
        display: block;
        max-width: 100%;
        padding: calc(.75em - 1px);
        resize: vertical;
        vertical-align: top;
        position: relative;
        line-height:1.5;
        font-size: 1rem;
        font-family: sans-serif!important;
    }
    .btn-send {
        background-color: #ff3300;
        border: 0;
        color: #fff;
        gap: 5px;
        width: 100px;
        cursor: pointer;
        justify-content: center;
        padding: calc(.5em - 1px) 1em;
        text-align: center;
        white-space: nowrap;
        align-items: center;
        line-height: 1.5;
        display: inline-flex;
        font-size: 1rem;
        font-family: sans-serif!important;
        height: 40px;
        border-radius: 5px;
        margin-left: 20px;
    }
    
    .comment-container .block-comment-list {
        display: block;
    }
    .comment-container .list-comment{
        display: block;
    }
    .box-cmt {
        margin-bottom: 15px;
        display: block;
    }
    .cmt-inf {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        margin-top: 10px;
    }
    .box-inf{
        align-items: center;
        display: flex;  
    }
    .box-inf .box-inf-avt span{
        background-color: #4f5675;
        color: #fff;
        align-items: center;
        border-radius: 50%;
        display: flex;
        font-size: 16px;
        font-weight: 700;
        height: 25px;
        justify-content: center;
        margin: 0 5px 0 0;
        text-transform: capitalize;
        width: 25px;
    }
    .box-inf .box-inf-name {
        font-size: 14px;
        font-weight: 700;
        line-height: 2;
        margin: 0;
        text-transform: capitalize;
    }
    .cmt-quest {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15);
        margin-left: auto;
        overflow: hidden;
        padding: 10px;
        width: calc(100% - 25px);
        display: block;
    }
    .cmt-quest .content{
        font-size: 13px;
        margin: 0;
        font-family: sans-serif!important;
    }
    .btn-rep {
        align-items: center;
        background-color: transparent;
        border: 0;
        color: #ff3300;
        cursor: pointer;
        display: flex;
        font-size: 14px;
        line-height: 1;
        margin-left: auto;
        margin-top: 10px;
        -webkit-text-decoration: none;
        text-decoration: none;
    }
    .cmt-rep {
        margin-left: auto;
        margin-top: 15px;
        width: calc(100% - 25px);
    }
`
export const WrapperDetail = styled.div`
    .slider {
        height: 400px; /* Đặt chiều cao cố định cho slider ở đây */
        overflow: hidden;
        align-items: center;
        justify-contents: center;
    }
    
`