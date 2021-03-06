import React, { useState, useEffect, useRef } from 'react';
import { Input, Button } from 'antd';
import axios from 'axios';

const TodoApp = (props) => {
	const { token } = props;
	const [jobs, setJobs] = useState([]);
	const [text, setText] = useState('');
	const inputRef = useRef();

	const fetchTask = async (value) => {
		try {
			const response = await axios.get(
				'https://api-nodejs-todolist.herokuapp.com/task',
				{ headers: { Authorization: 'Bearer ' + token } }
			);
			console.log(response);
			setJobs(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchTask();
	}, []);
	const handleAddTask = async () => {
		try {
			const response = await axios.post(
				'https://api-nodejs-todolist.herokuapp.com/task',
				{ description: text },
				{ headers: { Authorization: 'Bearer ' + token } }
			);
			console.log(response);
			setJobs((preState) => [...preState, response.data.data]);
		} catch (error) {
			console.log(error);
		}
	};
	const handleSubmit = () => {
		handleAddTask();
		setText('');
		inputRef.current.focus();
	};
	const handleRemove = (id) => {
		setJobs(jobs.filter((item) => item._id !== id));
	};
	console.log(jobs);
	return (
		<>
			<Input
				value={text}
				onChange={(e) => setText(e.target.value)}
				ref={inputRef}
			/>
			<Button onClick={handleSubmit}>Add</Button>
			{jobs.map((item) => {
				return (
					<div key={item._id}>
						{item.description}
						<Button>Update</Button>
						<Button onClick={() => handleRemove(item._id)}>Remove</Button>
					</div>
				);
			})}
		</>
	);
};

export default TodoApp;
