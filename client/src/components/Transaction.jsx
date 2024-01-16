import { useEffect, useState } from 'react';
import axios from 'axios';

function Transaction() {

	const [transactions, setTransactions] = useState([]);
	const [isTransactionLoading, setIsLoading] = useState(false);
    
	useEffect(() => {
		console.log("Transaction component is mounting/re-rendering...");
		const fetchTransactions = async () => {
			try {
				console.log("FETCHING TRANSACTIONS...")
				setIsLoading(true);
				const response = await axios.post("/api/transaction_sync", {
					access_token: sessionStorage.getItem("accessToken"),
				});		
				setTransactions(response.data.transactions);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				console.log("Error fetching account transactions: ", error);
			}
		}
		fetchTransactions();
	}, []);

	const groupedTransactions = {};
    if (!isTransactionLoading) {
        transactions.added?.map(transaction => {
			if (!groupedTransactions.hasOwnProperty(transaction.account_id)) {
				groupedTransactions[transaction.account_id] = [];
			}
			groupedTransactions[transaction.account_id].push(transaction);
        });        
    }
	
	return {
		transactions,
		groupedTransactions,
		isTransactionLoading,
	};

}

export default Transaction;
