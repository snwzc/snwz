/*
 * @Author: wl
 * @Date: 2020-06-08 17:07:54
 * @LastEditTime: 2020-06-08 18:37:45
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import Klayout from './Layout/layout';



ReactDOM.render(
  <BrowserRouter>
    <Klayout />
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
