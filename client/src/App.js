import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Link from './components/Link';
import Dashboard from './components/Dashboard';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route exact path="/link" element={<LinkPage/>} />
					<Route path="/dashboard" element={<DashboardPage/>} />
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

const DashboardPage = () => {
	return (
		<div>
            <Dashboard />
		</div>
	);
};


export default App;
