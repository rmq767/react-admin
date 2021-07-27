import React, { Component } from "react";
import { Form, Input, InputNumber, Switch, Button, message } from "antd";
import { DepartmentAddApi } from "../../api/department";

export default class DepartmentAdd extends Component {
	constructor(props) {
		super(props);
		this.form = React.createRef();
		this.state = {
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
	onSubmit = async (value) => {
		if (!value.name) {
			return message.error("部门名称不能为空！");
		}
		if (!value.content) {
			return message.error("描述不能为空！");
		}
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
				<Form.Item label="禁启用" name="status">
					<Switch
						checked={true}
						checkedChildren="开启"
						unCheckedChildren="关闭"
					/>
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
						添加
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
