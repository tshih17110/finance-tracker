import { useEffect, useState } from 'react';
import axios from 'axios';

function Balance() {

	const [balances, setBalances] = useState([]);
	const [isBalanceLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchBalances = async () => {
			try {
				setIsLoading(true);
				const response = await axios.post("/api/balance", {
					access_token: sessionStorage.getItem("accessToken"),
				});
				setBalances(response.data.Balance);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				console.error("Error fetching account balances: ", error);
			}
		}
		fetchBalances();
	}, []);


	return {
		balances,
		isBalanceLoading,
	};
	
}

export default Balance;
