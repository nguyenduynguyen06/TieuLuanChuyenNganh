import React from 'react';
import Tab from './tab';
import { ArrowLeftOutlined } from '@ant-design/icons';


const Orders = () => {
    const goBack = () => {
        window.history.back();
    };
    return (
        <div>
            <div style={{ background: '#fff', padding: '10px' }}>
                <button style={{ border: 'none', background: 'transparent' }} onClick={goBack}>
                    <ArrowLeftOutlined /> Quay lại
                </button>
            </div>

            <div style={{ width: '100%', padding: '0 10px 0 10px' }}>
                <Tab />
            </div>
        </div>

    )
}

export default Orders