import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '../styles/style.scss';

const CategoryChart = ({ transactions }) => {

    const categoryColors = [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f"
    ];
    
    const cleanCategory = (input) => {
        const category = input.split("_").join(" ");
        return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    };

    const categoryCount = transactions.reduce((acc, transaction) => {
        const { primary } = transaction.personal_finance_category;
        acc[primary] = (acc[primary] || 0) + 1;
        return acc;
    }, {});

    const pfcData = Object.keys(categoryCount).map(primary => ({
        name: primary,
        value: categoryCount[primary],
    }));

    const renderCustomizedTooltip = (props) => {
        const { payload } = props;

        if (payload && payload.length) {
            const { name, value } = payload[0].payload;
            return (
                <div className="pie-tooltip">
                    <p>{cleanCategory(name)}: {value}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <PieChart width={730} height={250}>
            <Pie 
                data={pfcData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={100} 
                fill="#8884d8" 
                label={false}
            >
                {pfcData.map((entry, index) => (                    
                    <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                ))}
            </Pie>
            <Tooltip content={renderCustomizedTooltip}/>
            <Legend layout="vertical" verticalAlign="middle" align="right"/>
        </PieChart>
    )
    
        
}

export default CategoryChart;
