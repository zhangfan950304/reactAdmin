import React from 'react';
import './header.less'
import LinkButton from '../link-button/link-button'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqWeather } from '../../api/index'
import { withRouter} from 'react-router-dom'
import menuConfig from '../../config/menuConfig'
import { Modal, Button } from 'antd';
const { confirm } = Modal;


class HeaderNav extends React.Component{
	state={
		currentTime:formateDate(Date.now()),//当前时间字符串
		dayPictureUrl:'',//天气图片url
		weather:'',
	}
	getTitle=()=>{
		const path = this.props.location.pathname;
		let title
		menuConfig.forEach(item =>{
			if(item.key === path){
				title = item.title
			}else if(item.children){
				const cItem = item.children.find(cItem =>cItem.key===path)
				if(cItem){
					title = cItem.title
				}
			}
		})
		return title
		
	}
    getTime=()=>{
    	this.intervalId=setInterval(()=>{
    		const nowTime=formateDate(Date.now());
    		this.setState({
    			currentTime:nowTime
    		})
    	},1000)
    }
    getWeather= async ()=>{
    	const { dayPictureUrl,weather } = await reqWeather('北京');//调用接口请求异步获取数据
    	this.setState({ dayPictureUrl,weather })
    }
    logout=()=>{
    	confirm({
			    title: '您确认要退出系统嘛?',
			    onOk:()=> {//使用箭头函数，改变this指向
			      //console.log('O');
			      storageUtils.removeUser();
			      memoryUtils.user={}
			      //跳转到登录页面
			      this.props.history.replace('/login');
			    },
			   /* onCancel() {  可有可无
			      console.log('Cancel');
			    },*/
			  });
		    }
    componentWillMount(){
    	
    }
	componentDidMount(){
		this.getTime();
		this.getWeather();
	}
	componentWillUnmount(){
		clearInterval(this.intervalId);
	}
	render(){
		const{currentTime,dayPictureUrl,weather} =this.state;
		const username = memoryUtils.user.username;
		const title = this.getTitle();
		return<div className='headerNav'>
				<div className='header-top'>
					<span> 欢迎,{username}</span>
					<LinkButton onClick={this.logout}>退出</LinkButton>
				</div>
				<div className='header-bottom'>
					<div className="header-bottom-left">{title}</div>
					<div className="header-bottom-right">
						<span>{currentTime}</span>
						<img src={dayPictureUrl} alt="weather"/>
						<span>{weather}</span>

					</div>
				</div>
		</div>
	}
}

export default withRouter(HeaderNav);