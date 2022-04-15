import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import callApi from '../Utils/callApi';

const LoginModal = (props) => {
	const { isModalVisible } = props;

	const handleLoginFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
		// todo somthing
	};

	const handleLogin = async (value) => {
		try {
			const resp = await callApi({
				url: `/user/login`,
				method: "POST",
				data: value
			});

			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Modal title="Login modal" visible={isModalVisible} footer={null}>
			<Form
				name="Login"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 14 }}
				initialValues={{ remember: true }}
				onFinish={handleLogin}
				onFinishFailed={handleLoginFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[{ required: true, message: 'Please input your email!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default LoginModal;
