import Balance from './Balance';
import Transaction from './Transaction';
import React, { useState, useEffect } from 'react';

function Dashboard() {

    const { balances, isBalanceLoading } = Balance();
    const { transactions, groupedTransactions, isTransactionLoading } = Transaction();
    const [ currentOpenAccount, setCurrentOpenAccount ] = useState(null);

    const handleAccountClick = (account_id) => {
        setCurrentOpenAccount(account_id === currentOpenAccount ? null : account_id);
    };

    console.log(sessionStorage.getItem("accessToken"));

    return (

        <div className="dashboard-container">
            <div className="account-list">
                <h2>Accounts</h2>
                {isBalanceLoading ? (
                <p>Loading...</p>
                ) : balances.accounts && balances.accounts.length > 0 ? (
                <ul>
                    {balances.accounts.map((account, index) => (
                    <li key={index} onClick={() => handleAccountClick(account.account_id)}>
                        {account.name}: ${parseFloat(account.balances.current).toFixed(2)}
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No accounts available.</p>
                )}
            </div>

            <div className="transaction-list">
                <h2>Transactions</h2>
                {currentOpenAccount !== null && currentOpenAccount in groupedTransactions ? (
                <ul>
                    {groupedTransactions[currentOpenAccount].map((transaction, index) => (
                    <li key={index}>
                        Transaction: {transaction.name}, Amount: ${transaction.amount}
                    </li>
                    ))}
                </ul>
                ) : (
                <p>Select an account to view transactions.</p>
                )}
            </div>
        </div>
    );

}

export default Dashboard;
