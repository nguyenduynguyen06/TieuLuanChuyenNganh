import styled from "styled-components";

export const WrapperLogin = styled.div`
    background: #03647B;
    display: flex;
    padding: 30px;
    height: auto;
    min-height: 100vh;
    .container{
        display: flex;
        flex-direction: column;
        margin: auto;
        background: #fff;
        padding: 0 50px;
        width: 600px;
    }
    .header{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 9px;
        width: 100%;
        margin-top: 30px;
    }
    .text{
        color: #03647B;
        font-size: 40px;
        font-weight: 700;
    }
    .underline{
        width: 61px;
        height: 6px;
        background: #03647B;
        border-radius: 9px;
    }
    .inputs{
        margin-top: 55px;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    .input{
        padding: 5px;
        display: flex;
        align-items: center;
        margin: auto;
        width: 480px;
        height: 50px;
        background: #eaeaea;
        border-radius: 6px;
    }
    .input input{
        height: 30px;
        width: 400px;
        background: transparent;
        border: none;
        outline: none;
        color: #797979;
        font-size: 15px;
    }
    .forgot-password{
        margin-top: 27px;
        color: #797979;
        font-size: 15px; 
    }
    .forgot-password span{
        color: #03647B;
        cursor: pointer;
    }
    .submit-container {
        display: flex;
        gap: 30px;
        margin: 60px auto;
    }
    .submit {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 220px;
        height: 59px;
        color: #fff;
        background: #03647B;
        border-radius: 50px;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
    }
    .gray{
        background: #eaeaea;
        color: #676767;
    }
`
