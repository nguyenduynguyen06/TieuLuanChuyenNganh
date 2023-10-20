import styled from "styled-components";

export const WrapperPaymentInfo = styled.div`
    .nav {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f4f6f8;
        gap: 10px;
        left: 0;
        margin-bottom: 10px;
        padding: 5px 15px 10px;
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 10;
        flex-wrap: wrap;
        list-style: none;
    }
    .nav__item1{
        border-bottom: 3px solid #d70018;
        color: #d70018;
        pointer-events: none;
        cursor: pointer;
        flex: 1;
        font-weight: 600;
        padding: 5px 0;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        list-style: none;
    }
    .nav__item2{
        border-bottom: 3px solid #919eab;
        color: #919eab;
        cursor: pointer;
        flex: 1;
        font-weight: 600;
        padding: 5px 0;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
    }
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
    .block-customer{
        padding: 10px;
    }
    .block-customer p{
        text-transform: uppercase;
    }
    .bottom-bar{
        background-color: #fff;
        border: 1px solid rgba(145,158,171,.239);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        bottom: 0;
        box-shadow: 0 -4px 20px -1px rgba(40,124,234,.15);
        width: 60%;
        padding: 10px 10px 20px;
        position: fixed;
        right: 50%;
        transform: translateX(50%);
        z-index: 20;
        margin-top: auto;
        margin-left: auto;
    margin-right: auto;
    }
    .total-box{
        align-items: flex-start!important;
        justify-content: space-between!important;
        display: flex!important;
    }
    .price{
        align-items: flex-end!important;
        column!important;
        display: flex!important;
    }
    .total {
        color: #d70018;
    font-weight: 700;
    }
    .btn-submit {
        margin-top: 0.5rem!important;
    }
    .btn-next {
        background-color: #d70018;
        font-weight: 500;
        cursor: pointer;
        width: 100%!important;
        align-items: center!important;
        justify-content: center!important;
        flex-direction: column!important;
        display: flex!important;
        border-color: #dc3545;
        color: #fff;
        border: 1px solid transparent;
    }
`
export const WrapperBtnNext = styled.div`

`