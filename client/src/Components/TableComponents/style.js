import styled from "styled-components";

export const WrapperInvoice = styled.div`
    padding: 10px;
    width: 210mm;
    height: 297mm;
    margin: 0; /* Loại bỏ margin mặc định */
    padding: 10px; 
    font-family: Times;
    .header-in{
        display: flex;
    }
    .logo{
        width: 20%;
        display: flex;
        align-items: center;
    }
    .logo-img{
        width: 100%;
    }
    .inf{
        font-size: 15px;
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-left: 20px;
    }
    .body-inf{
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: left;
    }
`