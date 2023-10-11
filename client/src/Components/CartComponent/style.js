import styled from "styled-components";

export const HeaderWrapper = styled.div`
.header-wrapper {
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,.09);
    height: 6.25rem;
    min-width: 100%;

}
.header-container {
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    display: block;
}
.cart-page-header {
    padding-left: 1.125rem;
    display: flex;
    flex: 1;
}
.cart-page-logo {
    text-decoration: none;
    color: rgba(0,0,0,.87);
    display: block;
    display: flex;
    align-items: flex-end;
}
.logo-icon {
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    width: 8.125rem;
    height: 2.875rem;
    cursor: pointer;
    fill: #ee4d2d;
}
.logo-icon img{
    padding-top: 10%;
    width: 100%;
    height: auto;
}
.cart-page-logo {
    text-decoration: none;
    color: rgba(0,0,0,.87);
    display: block;
    display: flex;
    align-items: flex-end;
}
.cart-page-name {
    margin-left: 0.9375rem;
    border-left: 0.0625rem solid #ee4d2d;
    color: #ee4d2d;
    font-size: 1.25rem;
    line-height: 1.875rem;
    height: 1.875rem;
    padding-left: 0.9375rem;
    margin-bottom: 0.0625rem;
    text-transform: capitalize;
}
.cart-page-searchbar {
    width: 38.8125rem;
    position: relative;
}
`