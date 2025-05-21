import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";

const Analytics = () => {
    // Mock data for spending categories (replace with real data from your API)
    const spendingData = [
        { name: "Food", value: 400 },
        { name: "Transport", value: 300 },
        { name: "Entertainment", value: 200 },
        { name: "Utilities", value: 100 },
    ];

    // Colors for the pie chart
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    // Calculate total spending for the percentage display
    const totalSpending = useMemo(
        () => spendingData.reduce((sum, item) => sum + item.value, 0),
        [spendingData]
    );

    return (
        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Spending Analytics</h3>
            <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={spendingData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label
                            >
                                {spendingData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                    <div className="space-y-2">
                        {spendingData.map((item, index) => (
                            <div key={item.name} className="flex items-center">
                                <div
                                    className="w-4 h-4 rounded-full mr-2"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span className="text-sm">
                                    {item.name}: ₹{item.value} (
                                    {((item.value / totalSpending) * 100).toFixed(1)}%)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;