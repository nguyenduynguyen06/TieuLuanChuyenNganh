import styled from "styled-components";
import { Button, Row } from "antd";

export const WrapperTab = styled.div`
    .tab-buttons {
        width:100%;
    }
    .active{
        background: #8c52ff;
        color: #fff;
    }
`
export const WrapperBtn = styled(Button)`
    width: 20%;
`

export const WrapperDetailOrder = styled(Row)`
 .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
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
    .btn-back {
        border: none;
        background: transparent;
    }
`