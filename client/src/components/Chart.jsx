import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/style.scss';

const Chart = ({ transactions }) => {

    // const withdrawalData = transactions.filter(transaction => transaction.type === 'withdrawal');
    // const depositData = transactions.filter(transaction => transaction.type === 'deposit');

    return (
        <LineChart
          width={600}
          height={300}
          data={transactions}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="0" vertical={false}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="blue" />
          {/* <Line type="monotone" dataKey="amount" data={withdrawalData} name="Expenses" stroke="red"/> */}
          {/* <Line type="monotone" dataKey="amount" data={depositData} name="Income" stroke="green"/> */}
        </LineChart>
    );    
}

export default Chart;
