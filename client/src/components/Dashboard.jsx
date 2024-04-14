import Balance from './Balance';
import Transaction from './Transaction';
import ExpenseChart from './ExpenseChart';
import CategoryChart from './CategoryChart';
import AccountChart from './AccountChart';
import React, { useState, useEffect } from 'react';
import { isEqual } from 'lodash';

import '../styles/style.scss';

function Dashboard() {

    const { balances, isBalanceLoading } = Balance();
    const { transactions, groupedTransactions, isTransactionLoading } = Transaction();
    const [ currentOpenAccount, setCurrentOpenAccount ] = useState(null);
    const [ accountData, setAccountData ] = useState([]);
    
    useEffect(() => {
        if (balances && balances.accounts && groupedTransactions) {
            const data = balances.accounts.map(account => {
                const accountId = account.account_id;
                const accountTransactions = groupedTransactions[accountId] || [];
                const totalWithdrawals = accountTransactions.reduce((sum, transaction) => {
                    return transaction.type === 'withdrawal' ? sum + parseFloat(transaction.amount) : sum;
                }, 0);
                return {
                    name: account.name,
                    officialName: account.official_name,
                    withdrawalSum: totalWithdrawals,
                    
                };
            });
            if (!isEqual(data, accountData)) {
                setAccountData(data);
            }
        }
    }, [balances, groupedTransactions, accountData]);

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
                                    <span className="transaction-date">{transaction.long_date}</span>
                                    <span className="transaction-name">{transaction.name}</span>
                                    <span className="transaction-amount">
                                        {transaction.type === "withdrawal" ? "-" : ""}{transaction.currency_symbol}{parseFloat(Math.abs(transaction.amount)).toFixed(2)}</span>                                        
                                </div>
                            </li>
                            ))}
                        </ul>
                        ) : (
                        <p>Select an account to view its transactions.</p>
                        )}
                    </div>
                </div>

                <div className="expense-content">
                    {currentOpenAccount !== null && currentOpenAccount in groupedTransactions ? (
                        <ExpenseChart transactions={groupedTransactions[currentOpenAccount]} />
                        ) : (
                        <p>Select an account to view the chart.</p>
                    )}            
                </div>

                <div className="pie-content">
                    <div className="account-content">
                        <AccountChart accounts={accountData}/>
                    </div>

                    <div className="category-content">
                        {currentOpenAccount !== null && currentOpenAccount in groupedTransactions ? (
                            <CategoryChart transactions={groupedTransactions[currentOpenAccount]} />
                            ) : (
                            <p>Select an account to view the transaction categories.</p>
                        )}      
                    </div>    
                </div>
                
                

            </div>            


        </div>
    );

}

export default Dashboard;
