import React from 'react'

import { Layout } from 'antd'
import Router from '../router'
import KHeader from './header/index'



const { Header, Footer, Content } = Layout;



export default (props) => {
    return <Layout>
        <Header>
            <KHeader />
        </Header>
        <Content>
            <Router />
        </Content>
        <Footer>Footer</Footer>
    </Layout>
}