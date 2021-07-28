import React, { Component } from "react";
import { Form, Input, InputNumber, Switch, Button, message } from "antd";
import {
	DepartmentAddApi,
	DepartmentDetailApi,
	DepartmentEditApi,
} from "../../api/department";

export default class DepartmentAdd extends Component {
	constructor(props) {
		super(props);
		this.form = React.createRef();
		this.state = {
			id: null,
			loading: false,
			formLayout: {
				labelCol: {
					span: 1,
				},
				wrapperCol: {
					span: 10,
				},
			},
		};
	}
	componentDidMount() {
		debugger;
		if (this.props.location.state) {
			this.setState({ id: this.props.location.state.id });
		}
		// if (this.props.location.state && this.state.id) {
		// 	this.getDetail(this.state.id);
		// }
	}
	componentDidUpdate() {
		debugger;
		if (!this.props.location.state && this.state.id) {
			this.form.current.resetFields();
			this.setState({
				id: null,
			});
		}
		if (this.props.location.state && this.state.id) {
			this.getDetail(this.state.id);
		}
	}
	getDetail = async (id) => {
		if (!this.props.location.state) {
			return false;
		}
		const res = await DepartmentDetailApi({ id });
		const { name, number, status, content } = res.data.data;
		this.form.current.setFieldsValue({
			name,
			number,
			status,
			content,
		});
	};
	onSubmit = async (value) => {
		if (!value.name) {
			return message.error("部门名称不能为空！");
		}
		if (!value.content) {
			return message.error("描述不能为空！");
		}
		this.state.id ? this.Edit(value) : this.Add(value);
	};
	Add = async (value) => {
		this.setState({
			loading: true,
		});
		const res = await DepartmentAddApi(value);
		if (res.data.resCode === 0) {
			this.setState({
				loading: false,
			});
			this.form.current.resetFields();
		} else {
			this.setState({
				loading: false,
			});
		}
	};
	Edit = async (value) => {
		const params = Object.assign({}, value, { id: this.state.id });
		this.setState({
			loading: true,
		});
		const res = await DepartmentEditApi(params);
		if (res.data.resCode === 0) {
			this.setState({
				loading: false,
			});
			this.form.current.resetFields();
		} else {
			this.setState({
				loading: false,
			});
		}
	};
	render() {
		return (
			<Form
				ref={this.form}
				{...this.state.formLayout}
				initialValues={{ number: 1, status: true }}
				onFinish={this.onSubmit}
			>
				<Form.Item label="部门名称" name="name">
					<Input />
				</Form.Item>
				<Form.Item label="人员数量" name="number">
					<InputNumber min={1} max={100} />
				</Form.Item>
				<Form.Item label="禁启用" name="status" valuePropName="checked">
					<Switch checkedChildren="开启" unCheckedChildren="关闭" />
				</Form.Item>
				<Form.Item label="描述" name="content">
					<Input.TextArea rows={4} />
				</Form.Item>
				<Form.Item>
					<Button
						loading={this.state.loading}
						type="primary"
						htmlType="submit"
					>
						{this.state.id ? "编辑" : "添加"}
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
