import React from 'react';
import NewsCard from '../../Components/NewsPageCom/NewsCard';
import { Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';


function NewsPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Breadcrumb style={{ margin: '16px 16px' }}>
                <Breadcrumb.Item>
                    <NavLink to="/">Home</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <NavLink to={`/news`}>Tin tức</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <div style={{ display: 'flex', width: '80%', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <NewsCard></NewsCard>
                </div>
            </div>
        </div>

    );
}

export default NewsPage;
