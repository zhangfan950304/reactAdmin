/*商品分类路由*/
import React from 'react';
import {Card,Button,Icon, Table, } from 'antd'
import LinkButton from '../../components/link-button/link-button'
export default class Categroy extends React.Component{
	render(){
		//card的左侧
		const title = '一级分类列表'
		//card的右侧
		const extra =(
			<Button type='primary'>
				<Icon type='plus' />添加
			</Button>
			)
		  const dataSource = [
				  {
				    "parentId":"0",
				    "_id":"5ca9d695b49ef916541160ba",
				    "name":"家用电器",
				    "__v":0
				  },
				  {
				    "parentId":"0",
				    "_id":"5ca9d695b49ef916541160ba",
				    "name":"电器",
				    "__v":0
				  },
				  {
				    "parentId":"0",
				    "_id":"5ca9d695b49ef916541160ba",
				    "name":"家用",
				    "__v":0
				  },
				  {
				    "parentId":"0",
				    "_id":"5ca9d695b49ef916541160ba",
				    "name":"家器",
				    "__v":0
				  },
				];

			const columns = [
				  {
				    title: '分类的名称',
				    dataIndex: 'name',
				  },
				   {
				    title: '操作',
				    width:300,
				    render: () => <span>
					    <LinkButton>查看分类</LinkButton>
					    <LinkButton>查看子分类</LinkButton>
				    </span>,
 				 },
				];
		return <div>
		    <Card title={title} extra={extra}>
				<Table bordered rowKey='_id' dataSource={dataSource} columns={columns} />;
		    </Card>
		   </div>
	}
}