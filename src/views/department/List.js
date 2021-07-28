import React, { Component, Fragment } from "react";
import { Form, Input, Button, Table, Switch, message, Modal } from "antd";
import {
	DepartmentListApi,
	DepartmentDeleteApi,
	DepartmentStatusApi,
} from "../../api/department";

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
								loading={this.state.id === row.id}
								onChange={() => this.changeStatus(row)}
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
								<Button
									type="primary"
									onClick={() => this.editDepartment(row.id)}
								>
									编辑
								</Button>
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
			id: "",
			tableLoading: false,
		};
	}
	onFinish = (value) => {
		if (this.state.tableLoading) {
			return;
		}
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
	// 获取列表
	getList = async () => {
		const params = {
			pageNumber: this.state.pageNumber,
			pageSize: this.state.pageSize,
			name: this.state.keyWord,
		};
		this.setState({
			tableLoading: true,
		});
		const res = await DepartmentListApi(params);
		this.setState({
			data: res.data.data.data,
			total: res.data.data.total,
			tableLoading: false,
		});
		console.log(res);
	};
	// 多选
	onCheckBox = (row) => {
		this.setState({
			checkBoxData: row,
		});
		console.log(row);
	};
	// 改变禁启用
	changeStatus = async (row) => {
		this.setState({
			id: row.id,
		});
		const res = await DepartmentStatusApi({
			id: row.id,
			status: !row.status,
		});
		if (res.data.resCode === 0) {
			message.success(res.data.message);
			this.setState({
				id: "",
			});
		}
	};
	// 删除
	deleteDepartment = async (id) => {
		if (!id) {
			if (this.state.checkBoxData.length === 0) {
				return;
			}
			id = this.state.checkBoxData.join();
		}
		let self = this;
		Modal.confirm({
			title: "提示",
			content: "确定删除吗？",
			okText: "确认",
			cancelText: "取消",
			async onOk() {
				if (!id) {
					return false;
				}
				const res = await DepartmentDeleteApi({ id });
				if (res.data.resCode === 0) {
					message.success("删除成功");
					self.setState({
						checkBoxData: [],
					});
					self.getList();
				}
			},
			onCancel() {},
		});
	};
	// 编辑
	editDepartment = (id) => {
		this.props.history.push({
			pathname: "/index/department/add",
			state: { id },
		});
	};
	render() {
		const { columns, data, tableLoading } = this.state;
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
						loading={tableLoading}
					></Table>
					<Button onClick={() => this.deleteDepartment()}>
						批量删除
					</Button>
				</div>
			</Fragment>
		);
	}
}
