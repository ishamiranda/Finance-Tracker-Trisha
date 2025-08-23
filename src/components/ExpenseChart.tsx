import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const expenseData = [
  { name: 'Housing', value: 1200, color: '#8884d8' },
  { name: 'Food', value: 400, color: '#82ca9d' },
  { name: 'Transportation', value: 300, color: '#ffc658' },
  { name: 'Entertainment', value: 200, color: '#ff7300' },
  { name: 'Utilities', value: 150, color: '#00ff00' },
  { name: 'Other', value: 250, color: '#ff0000' }
];

const ExpenseChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;