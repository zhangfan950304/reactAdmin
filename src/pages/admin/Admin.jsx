import React from 'react';
import memoryUtils from '../../utils/memoryUtils';
import {Redirect,Route,Switch} from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import HeaderNav from '../../components/header'
import Category from '../category/category'
import User from '../user/user'
import Role from '../role/role'
import Home from '../home/home'
import Product from '../product/product'
import Bar from '../charts/bar'
import Pie from '../charts/pie'
import Line from '../charts/line'

const { Footer, Sider, Content } = Layout;

export default class Admin extends React.Component{
	
	render(){
		const user = memoryUtils.user;
		if(!user || user._id){
			return <Redirect to ='/login'/>//自动跳转登录页面
		}
	return <div style={{height:'100%'}}>
		    <Layout style={{height:'100%'}}>
		      <Sider>
		      	<LeftNav></LeftNav>
		      </Sider>
		      <Layout>
		        <HeaderNav></HeaderNav>
		        <Content style={{margin:'20px',marginBottom:'0px',backgroundColor:'#fff'}}>
		        	<Switch>
		        		<Route path='/home' component={Home}/>
		        		<Route path='/category' component={Category}/>
		        		<Route path='/product' component={Product}/>
		        		<Route path='/role' component={Role}/>
		        		<Route path='/user' component={User}/>
		        		<Route path='/charts/bar' component={Bar}/>
		        		<Route path='/charts/line' component={Line}/>
		        		<Route path='/charts/pie' component={Pie}/>
		        		<Redirect to='/home'/>
		        	</Switch>
		        </Content>
		        <Footer style={{textAlign:'center',color:"#ccc"}}>zhangfan@foucs</Footer>
		      </Layout>
		    </Layout>
		  </div>
	}
}