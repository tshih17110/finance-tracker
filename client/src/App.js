import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Link from './components/Link';
import Balance from './components/Balance';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route exact path="/link" element={<LinkPage/>} />
					<Route path="/dashboard" element={<Dashboard/>} />
				</Routes>
			</div>
		</Router>
	);
}

const LinkPage = () => {
	return (
		<div>
			<Link />
		</div>
	);
};

const Dashboard = () => {
	return (
		<div>
			<Balance />
		</div>
	);
};


export default App;
