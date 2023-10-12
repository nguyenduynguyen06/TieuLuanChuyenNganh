import styled from "styled-components";

export const HeaderWrapper = styled.div`
.header-wrapper {
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,.09);
    height: 6.25rem;
    width: 100%;

}
.header-container {
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    display: flex;
    align-items: space-around;
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
    fill: #8c52ff;
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
    border-left: 0.0625rem solid #8c52ff;
    color: #8c52ff;
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
    display: flex;
  align-items: center;
}
.search-bar {
    --focus-indicator-spacing: 3px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    height: 2.5rem;
    box-sizing: border-box;
    padding: 0.1875rem;
    border-radius: 2px;
    flex: 1;
    background: #fff;
    padding-right: 30px;
}
.search-bar button{
    background-color: #8c52ff;
  color: white;

}
`