import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Alert } from 'antd';
import axios from 'axios';

const RegisterModal = (props) => {
	const { isRegisterModalVisible, setIsRegisterModalVisible } = props;
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleRegisterFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
		// todo somthing
	};

	const handleRegister = async (value) => {
		try {
			setMessage('');
			setLoading(true);
			const response = await axios.post(
				'https://api-nodejs-todolist.herokuapp.com/user/register',
				value
			);
			console.log(response);
			localStorage.setItem('token', response.data.token);
			setIsRegisterModalVisible(false);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			setMessage('Something went wrong, please try again');
		}
	};

	return (
		<Modal
			title="Register modal"
			visible={isRegisterModalVisible}
			footer={null}
		>
			<Form
				name="Login"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 14 }}
				initialValues={{ remember: true }}
				onFinish={handleRegister}
				onFinishFailed={handleRegisterFailed}
				autoComplete="off"
			>
				<Form.Item
					name="name"
					label="Name"
					rules={[{ required: true, message: 'Please input your name!' }]}
				>
					<Input />
				</Form.Item>
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
				{message && <Alert message={message} type="error" showIcon />}
				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Button type="primary" htmlType="submit" loading={loading}>
						Register
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default RegisterModal;
