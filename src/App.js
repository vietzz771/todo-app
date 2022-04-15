import './App.scss';
import LoginModal from './Components/LoginModal';
import { useState } from 'react';

function App() {
	const [isModalVisible, setIsModalVisible] = useState(true);

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<div className="App">
			<LoginModal isModalVisible={isModalVisible} handleCancel={handleCancel} />
		</div>
	);
}

export default App;
