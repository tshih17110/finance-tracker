import Balance from './Balance';
import Transaction from './Transaction';
import React, { useState, useEffect } from 'react';

import '../styles/style.scss';

function Dashboard() {

    const { balances, isBalanceLoading } = Balance();
    const { transactions, groupedTransactions, isTransactionLoading } = Transaction();
    const [ currentOpenAccount, setCurrentOpenAccount ] = useState(null);

    const handleAccountClick = (account_id) => {
        setCurrentOpenAccount(account_id === currentOpenAccount ? null : account_id);
    };

    return (

        <div className="dashboard-container">
            <div className="account-list">
                <h3>Accounts</h3>
                {isBalanceLoading ? (
                <p>Loading...</p>
                ) : balances.accounts && balances.accounts.length > 0 ? (
                <ul>
                    {balances.accounts.map((account, index) => (
                    <li key={index} onClick={() => handleAccountClick(account.account_id)}
                    className={currentOpenAccount === account.account_id ? 'selected-account' : ''}>
                        {account.name}: ${parseFloat(account.balances.current).toFixed(2)}
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No accounts available.</p>
                )}
            </div>

            <div className="transaction-list">
                <h3>Transactions</h3>
                <div className="transaction-content">
                    
                    {currentOpenAccount !== null && currentOpenAccount in groupedTransactions ? (
                    <ul>
                        {groupedTransactions[currentOpenAccount].map((transaction, index) => (
                        <li key={index}>
                            <div className="transaction">
                                <span className="transaction-name">{transaction.name}</span>
                                <span className="transaction-amount">
                                    {transaction.type === "withdrawal" ? "-" : ""}${parseFloat(Math.abs(transaction.amount)).toFixed(2)}</span>
                            </div>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p>Select an account to view its transactions.</p>
                    )}
                </div>
            </div>
        </div>
    );

}

export default Dashboard;
