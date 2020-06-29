import React from 'react'
import { Route } from "react-router-dom";

import Home from "../pages/home";
import index from '../pages/index';
import detail from '../pages/detail'

export default () => {
    return <>
        <Route path='/home' component={Home} />
        <Route path='/index' component={index} />
        <Route path='/detail/:id' component={detail} />
    </>
}