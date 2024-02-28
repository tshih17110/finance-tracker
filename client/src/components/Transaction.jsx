import { useEffect, useState } from 'react';
import axios from 'axios';

function Transaction() {

	const [transactions, setTransactions] = useState([]);
	const [isTransactionLoading, setIsLoading] = useState(false);

    const getCurrencySymbol = (isoCurrencyCode) => {
        switch (isoCurrencyCode) {
            case 'CAD':
            case 'USD':
                return '$';
            case 'EUR':
                return '€';
            case 'GBP':
                return '£';
        }
    }

    const convertDateFormat = (inputDate) => {
        const longDate = new Date(inputDate);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = longDate.toLocaleDateString(undefined, options);
        return formattedDate;
    }
    
	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				setIsLoading(true);
				const response = await axios.post("/api/transaction_sync", {
					access_token: sessionStorage.getItem("accessToken"),
				});
                const transactionsWithTypes = response.data.transactions.added.map(transaction => {
                    transaction.type = transaction.amount >= 0 ? "withdrawal" : "deposit";
                    transaction.currency_symbol = getCurrencySymbol(transaction.iso_currency_code);
                    transaction.long_date = convertDateFormat(transaction.date);
                    return transaction;
                });                
                setTransactions(transactionsWithTypes);                
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
        transactions?.map(transaction => {
			if (!groupedTransactions.hasOwnProperty(transaction.account_id)) {
				groupedTransactions[transaction.account_id] = [];
			}
            transaction.amount = parseFloat(transaction.amount).toFixed(2);
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
