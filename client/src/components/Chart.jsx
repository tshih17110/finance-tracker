import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/style.scss';

const Chart = ({ transactions }) => {

    const withdrawalData = transactions
        .filter(transaction => transaction.type === 'withdrawal')
        .map(transaction => ({
            ...transaction,
            chartAmount: `${transaction.currency_symbol}${transaction.amount}`,
        }));

    return (
        <LineChart
            width={600}
            height={300}
            data={withdrawalData}            
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
        <XAxis dataKey="long_date" tick={{ fontSize: "12px" }}/>
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

export default Chart;
