import React from 'react';
import './index.less'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon} from 'antd';
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;

class LeftNav extends React.Component{
	constructor(props){
		super(props);
		this.state={
		}
	}
componentWillMount(){
	this.menuNodes  = this.getMenuNodes(menuList);
}
	/*根据menu的数据数组生成对应的标签数组*/
	/*使用map+递归调用*/
	getMenuNodes = (menuList)=>{
		return menuList.map(item =>{
			if(!item.children){
				return <Menu.Item key={item.key}>
				           <Link to={item.key}>
				            <Icon type={item.icon} />
				            <span>{item.title}</span>
				           </Link>
				        </Menu.Item>
			}else{
				const cItem = item.children.find(cItem => cItem.key === this.props.location.pathname)
				if(cItem){
					this.openKey = item.key;
				}
				
				return <SubMenu
				            key={item.key}
				            title={
				              <span>
				                <Icon type={item.icon} />
				                <span>{item.title}</span>
				              </span>
				            }
				          >
				           {this.getMenuNodes(item.children)}
				           
				          </SubMenu>
			}
		})
	}
	render(){
		const openKey = this.openKey
		return<div>
			<Link to='/' className="leftNav">
			<header className="leftNavHeader">
				<h2>硅谷后台</h2>
			</header>
		</Link>
		
		 <Menu
        selectedKeys={this.props.location.pathname}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
        
          {this.menuNodes}
        </Menu>
        </div>
	}
}
/*高阶组件withRouter包装非路由组件，返回一个带有history/location/match新的组件*/
export default withRouter(LeftNav);

