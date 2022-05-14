import './App.scss';
import LoginModal from './Components/LoginModal';
import RegisterModal from './Components/RegisterModal';
import TodoApp from './Components/TodoApp';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [isModalVisible, setIsModalVisible] = useState(true);
	const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
	const token = localStorage.getItem('token');
	console.log(token);

	const fetchData = async () => {
		const response = await axios.get(
			'https://api-nodejs-todolist.herokuapp.com/user/me',
			{ headers: { Authorization: 'Bearer ' + token } }
		);
		console.log(response);
	};
	useEffect(() => {
		fetchData();
		console.log(token);
		if (token) {
			setIsModalVisible(false);
		} else {
			setIsModalVisible(true);
		}
	}, []);

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<div className="App">
			<LoginModal
				isModalVisible={isModalVisible}
				handleCancel={handleCancel}
				setIsModalVisible={setIsModalVisible}
				setIsRegisterModalVisible={setIsRegisterModalVisible}
			/>
			<RegisterModal
				isRegisterModalVisible={isRegisterModalVisible}
				setIsRegisterModalVisible={setIsRegisterModalVisible}
			/>
			<TodoApp token={token} />
		</div>
	);
}

export default App;
// 5