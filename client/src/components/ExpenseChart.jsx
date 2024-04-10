import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/style.scss';

const ExpenseChart = ({ transactions }) => {

    const withdrawalData = transactions
        .filter(transaction => transaction.type === 'withdrawal')
        .map(transaction => ({
            ...transaction,
            chartAmount: `${transaction.currency_symbol}${transaction.amount}`,
        }));

    return (
        <LineChart
            width={600}
            height={360}
            data={withdrawalData}            
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
        <XAxis dataKey="short_date" 
            tick={{ fontSize: "12px" }}
            angle={ -45 }
            textAnchor="end"
            height={ 80 }
            interval={ "equidistantPreserveStart" }/>
        <YAxis tick={{ fontSize: "12px" }} tickFormatter={(value) => `$${value}`}/>
        <CartesianGrid strokeDasharray="0" vertical={false}/>
        <Tooltip formatter={(value, name, props) => `${props.payload.currency_symbol}${value}`}/>
        <Legend />
        <Line type="monotone" 
            dataKey="amount" 
            data={withdrawalData}
            name="Expenses" 
            stroke="red"/>
          
        </LineChart>
    );    
}

export default ExpenseChart;
