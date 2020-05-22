import React from 'react'
import ReactDom from 'react-dom'
import 'antd/dist/antd.css'
import App from './App.js'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'


//读取local中保存user，保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user;
//将app组件标签渲染到index的页面div中
ReactDom.render(<App></App>,document.getElementById('root'))