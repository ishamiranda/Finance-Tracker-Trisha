import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Transaction } from "@/types/finance";

interface PixelExpenseChartProps {
  transactions: Transaction[];
}

const pastelColors = ['#FFB3E6', '#B3E5FF', '#B3FFB3', '#FFCCB3', '#E6B3FF', '#FFE6B3', '#B3FFCC'];

const PixelExpenseChart = ({ transactions }: PixelExpenseChartProps) => {
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const existing = acc.find(item => item.name === transaction.category);
      if (existing) {
        existing.value += Math.abs(transaction.amount);
      } else {
        acc.push({
          name: transaction.category,
          value: Math.abs(transaction.amount),
          color: pastelColors[acc.length % pastelColors.length]
        });
      }
      return acc;
    }, [] as { name: string; value: number; color: string }[]);

  return (
    <Card className="col-span-2 bg-gradient-to-br from-blue-100 to-cyan-100 border-4 border-blue-200 shadow-lg pixel-border animate-float">
      <CardHeader>
        <CardTitle className="text-blue-900 flex items-center gap-2 pixel-font animate-wiggle">
          🥧 Expense Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="animate-fade-in-slow">
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
              className="animate-spin-slow"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Amount']}
              contentStyle={{ 
                backgroundColor: '#E6F3FF', 
                border: '3px solid #B3E5FF',
                borderRadius: '0px',
                fontFamily: 'monospace'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PixelExpenseChart;