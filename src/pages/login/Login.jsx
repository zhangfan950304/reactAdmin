import React from 'react'
import './login.less'
import { Form, Icon, Input, Button,message } from 'antd';
import {reLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'

 class Login extends React.Component{

	handleSubmit=(event)=>{
		event.preventDefault();
    	this.props.form.validateFields( async (err, values) => {
     	 if (!err) {
     	 	const {username,password} = values
       		/*reLogin(username,password).then(response=>{
       				console.log('成功了',response.data);
       		}).catch(error=>{
       				console.log('失败了');
       		})*/
       		//使用async和await简化promise对象的使用，不用再使用then()来指定成功/失败的回调函数
       		//在返回promise的表达式的左侧鞋await，返回的是promise异步执行成功后的返回结果
       		//await所在函数（最近的）定义的左侧写async
       	
       			/*const response = await reLogin(username,password);
       			const result = response.data;*/
       			//在reLogin返回值的时候，直接返回reponse.data
       			const result = await reLogin(username,password);
       			if(result.status === 0){
       				message.success('成功了');
       				const user= result.data;
       				memoryUtils.user =  user;//保存到内存中
       				storageUtils.saveUser(user);//保存到本地中
       				//跳转页面,不需要回退使用replace；需要回退使用push
       				this.props.history.replace('/');
       			}else{
       				message.error(result.msg);
       			}
       		
     		 }else{
     		 	console.log('校验失败');
     		 }
    		});

		}
    //自定义验证规则
    validatePwd = (rule,value,callback)=>{
    	if(!value){
    		callback('密码必须输入');
    	}else if(!/^[a-zA-Z0-9_]*$/.test(value)){
    		callback('密码必须是英文，数字，下划线');
    	}else if(value.length<4){
    		callback('密码长度不能小于4位');
    	}else if (value.length >12) {
    		callback('密码长度不得超过12位');
    	}else{
    		callback();
    	}
    }

	render(){
		//如果用户已经登录，自动跳转到管理界面
		if(memoryUtils.user && memoryUtils.user._id){
				return <Redirect to='/'/>
		}
		//得到一个强大功能的form对象
		const { getFieldDecorator } = this.props.form;

		return<div className="login">
	   		<header className="login-header">
	   			<h1>React项目：后端管理系统</h1>
	   		</header>
	   		<section className='login-content'>
	   			<h2>注册登录</h2>
				   <Form onSubmit={this.handleSubmit} className="login-form">
			        <Form.Item>
			          {getFieldDecorator('username', {
				            rules: [
				            { required: true, whitespace:true,message: '用户名必须输入' },
				            { min:4, message: '用户至少输入4位' },
				            { max:12, message: '用户名最多12位' },
				            { pattern:/^[a-zA-Z0-9_]+$/, message: '用户名必须是数字，英文，下划线组成' },

				            ],
				            initialValue:'admin'
				          })(
				            <Input
				              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
				              placeholder="Username"
				            />,
				          )}
			        </Form.Item>
			        <Form.Item>
			         {getFieldDecorator('password', {
				            rules: [
				            { validator:this.validatePwd }
				            ],
				          })(
				             <Input
			              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
			              type="password"
			              placeholder="Password"
			           		 />,
				          )}
			         
			        </Form.Item>
			        <Form.Item>
			           <Button type="primary" htmlType="submit" className="login-form-button">
			            登录
			          </Button>
			        </Form.Item>
			      </Form>

	   		</section>

	   </div>
	}
}

//包装from组件，产生一个新的组件
export default Form.create()(Login)