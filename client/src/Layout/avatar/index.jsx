import React from 'react'
import { Avatar } from 'antd'
export default class UserAvatar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Avatar style={{ cursor: 'pointer' }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    }
}
