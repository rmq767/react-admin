import React, { Component, Fragment } from "react";
import { Form, Input, Button, Table, Switch, message } from "antd";
import { DepartmentListApi, DepartmentDeleteApi } from "../../api/department";

export default class DepartmentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{ title: "部门名称", dataIndex: "name", key: "name" },
				{
					title: "禁启用",
					dataIndex: "status",
					key: "status",
					render: (text, row) => {
						return (
							<Switch
								checkedChildren="开启"
								unCheckedChildren="关闭"
								defaultChecked={row.status}
							/>
						);
					},
				},
				{ title: "人员数量", dataIndex: "number", key: "number" },
				{
					title: "操作",
					dataIndex: "operation",
					key: "operation",
					width: 215,
					render: (text, row) => {
						return (
							<div className="inline-btn">
								<Button type="primary">编辑</Button>
								<Button
									type="danger"
									onClick={() =>
										this.deleteDepartment(row.id)
									}
								>
									删除
								</Button>
							</div>
						);
					},
				},
			],
			data: [],
			keyWord: "",
			pageNumber: 1,
			pageSize: 10,
			total: 0,
			checkBoxData: [],
		};
	}
	onFinish = (value) => {
		this.setState({
			keyWord: value.name,
			pageNumber: 1,
			pageSize: 10,
		});
		this.getList();
	};
	componentDidMount() {
		this.getList();
	}
	getList = async () => {
		const params = {
			pageNumber: this.state.pageNumber,
			pageSize: this.state.pageSize,
			name: this.state.keyWord,
		};
		const res = await DepartmentListApi(params);
		this.setState({
			data: res.data.data.data,
			total: res.data.data.total,
		});
		console.log(res);
	};
	onCheckBox = (row) => {
		this.setState({
			checkBoxData: row,
		});
		console.log(row);
	};
	deleteDepartment = async (id) => {
		if (!id) {
			return false;
		}
		const res = await DepartmentDeleteApi({ id });
		if (res.data.resCode === 0) {
			message.success("删除成功");
			this.getList();
		}
	};
	render() {
		const { columns, data } = this.state;
		const rowSelection = {
			onChange: this.onCheckBox,
		};
		return (
			<Fragment>
				<Form layout="inline" onFinish={this.onFinish}>
					<Form.Item label="部门名称" name="name">
						<Input placeholder="请输入部门名称" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							搜索
						</Button>
					</Form.Item>
				</Form>
				<div className="table-wrap">
					<Table
						rowKey="id"
						columns={columns}
						dataSource={data}
						bordered
						rowSelection={rowSelection}
					></Table>
				</div>
			</Fragment>
		);
	}
}
