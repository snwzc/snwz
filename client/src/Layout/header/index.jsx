import React from 'react'

import './header.css'
import { Link } from 'react-router-dom'
import UserAvatar from '../avatar/index'
import { Row, Col, Menu } from 'antd';

function handleClick(e) {
    console.log(e);
}


export default () => {
    return <div className='header'>
        <Row>
            <Col span={2} offset={2}> logo</Col>
            <Col span={6} offset={4}>
                <Menu onClick={handleClick} defaultSelectedKeys={['home']} mode="horizontal">
                    <Menu.Item key="home" ><Link to='/home'>推荐</Link> </Menu.Item>
                    <Menu.Item key="list" ><Link to='/index'>列表</Link>  </Menu.Item>
                </Menu>
            </Col>
            <Col span={2} offset={8}>
                <UserAvatar />
            </Col>
        </Row>
    </div>
}