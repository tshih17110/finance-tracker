import Balance from './Balance';
import Transaction from './Transaction';
import Chart from './Chart';
import React, { useState } from 'react';

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
            <div className="sidebar">
                <div className="account-list">
                    <h3>ACCOUNTS</h3>
                    {isBalanceLoading ? (
                    <p>Loading...</p>
                    ) : balances.accounts && balances.accounts.length > 0 ? (
                    <ul>
                        {balances.accounts.map((account, index) => (
                        <li key={index} onClick={() => handleAccountClick(account.account_id)}
                        className={currentOpenAccount === account.account_id ? 'selected-account' : ''}>
                            <div className="account-info">
                                <span>{account.name}</span>
                                <span>${parseFloat(account.balances.current).toFixed(2)}</span>                                
                            </div>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p>No accounts available.</p>
                    )}
                </div>
            </div>

            <div className="content-section">
                <div className="transaction-content">
                    <h3>Transactions</h3>
                    <div className="transaction-list">                        
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

                <div className="chart-content">
                    {currentOpenAccount !== null && currentOpenAccount in groupedTransactions ? (
                        <Chart transactions={groupedTransactions[currentOpenAccount]} />
                        ) : (
                        <p>Select an account to view the chart.</p>
                    )}            
                </div>            
            </div>            


        </div>
    );

}

export default Dashboard;
