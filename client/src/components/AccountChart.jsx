import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';

const AccountChart = ({ accounts }) => {

    const accountColors = [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f"
    ];
    console.log(accounts);

    const total = accounts.reduce((sum, account) => sum + account.withdrawalSum, 0);

    const renderCustomizedTooltip = (props) => {
        const { payload } = props;
    
        if (payload && payload.length) {

            console.log(total)
            return (
                <div className="account-tooltip">
                    {payload.map((segment, index) => (
                        <p key={index}>{segment.name}: {(segment.value / total * 100).toFixed(2)}%</p>
                    ))}
                </div>
            );
        }
    
        return null;
    };

    return (
        <PieChart width={250} height={250}>
            <Pie
                data={accounts}
                dataKey="withdrawalSum"
                nameKey="name"
                name="ExpenseChart"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                fill="#8884d8"
                label={false}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {accounts.map((account, index) => (
                    <Cell key={`cell-${index}`} fill={accountColors[index % accountColors.length]} />
                ))}
                <Label value="Account Expenses" position="center" fill="black"/>
            </Pie>
            <Tooltip
                content={renderCustomizedTooltip} 
                wrapperStyle={{ backgroundColor: "white",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                zIndex: 10}}/>
        </PieChart>
    );
};

export default AccountChart;
