import React, { Component } from 'react';
import axios from 'axios';

class Balance extends Component {
	constructor() {
		super();
		this.state = {
			balances: [],
			isLoading: true,
		}
	}

	componentDidMount = async() => {
		try {
			const response = await axios.post("/api/balance", {
				access_token: sessionStorage.getItem("accessToken"),
			});
			this.setState({
				balances: response.data.Balance,
				isLoading: false,
			});
		} catch (error) {
			console.error("Error fetching balances: ", error);
			this.setState({
				isLoading: false, 
			});            
		}
	}

	render() {
		const { balances, isLoading } = this.state;
		return (
			<div>
				<h2>Account Balances</h2>
				{isLoading ? ( 
					<p>Loading...</p>
				) : balances.accounts && balances.accounts.length > 0 ? (
					<ul>
						{balances.accounts.map((account, index) => (
							<li key={index}>
								{account.name}: ${parseFloat(account.balances.current).toFixed(2)}
							</li>
						))}
					</ul>
				) : (
					<p>No accounts available.</p>
				)}
			</div> 
		)
	}
}

export default Balance;