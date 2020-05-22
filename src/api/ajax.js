/*
能发送异步ajax请求的函数模块
封装axios库
函数发的返回值是一个promise对象

统一处理请求异常
  在外层包一个自己创建的promise对象，
  在请求出错时，不用reject（），而是显示错误提示
*/

import axios from 'axios'
import {message} from 'antd'
export default function ajax(url,data={},type='GET'){
	return new Promise((resolve,reject)=>{
		let promise;
	if(type === 'GET'){
		promise = axios.get(url,{
			params:data  //指定请求参数
		})
	}else{
		promise = axios.post(url,data);
	}

	promise.then(response =>{
		resolve(response.data);//直接将响应的数据返回去，即让调用该方法获取到的时response.data的值
	}).catch(error=>{
		message.error('请求出错了：'+error.message);
	})

	})
	
}