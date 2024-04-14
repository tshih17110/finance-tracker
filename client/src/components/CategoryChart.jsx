import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
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

    const totalCount = Object.values(categoryCount).reduce((total, count) => total + count, 0);

    const pfcData = Object.keys(categoryCount).map(primary => ({
        name: primary,
        value: (categoryCount[primary] / totalCount) * 100,
    }));

    const renderCustomizedTooltip = (props) => {
        const { payload } = props;

        if (payload && payload.length) {
            const { name, value } = payload[0].payload;
            return (
                <div className="category-tooltip">
                    <p>{cleanCategory(name)}: {value.toFixed(2)}%</p>
                </div>
            );
        }

        return null;
    };

    return (
        <PieChart width={250} height={250}>
            <Pie 
                data={pfcData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                innerRadius={80}
                outerRadius={100} 
                fill="#8884d8" 
                label={false}
            >
                {pfcData.map((entry, index) => (                    
                    <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                ))}
                <Label value="Category Expenses" position="center" fill="black"/>
            </Pie>
            <Tooltip 
                content={renderCustomizedTooltip}
                wrapperStyle={{ backgroundColor: "white", 
                                paddingLeft: "10px", 
                                paddingRight: "10px",
                                zIndex: 10}}/>
        </PieChart>
    )
    
        
}

export default CategoryChart;
