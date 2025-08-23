import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Transaction } from "@/types/finance";

interface CozyExpenseChartProps {
  transactions: Transaction[];
}

const cozyColors = ['#d97706', '#ea580c', '#dc2626', '#c2410c', '#b45309', '#a16207', '#92400e'];

const CozyExpenseChart = ({ transactions }: CozyExpenseChartProps) => {
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
          color: cozyColors[acc.length % cozyColors.length]
        });
      }
      return acc;
    }, [] as { name: string; value: number; color: string }[]);

  return (
    <Card className="col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-amber-900 flex items-center gap-2">
          🥧 Expense Breakdown
        </CardTitle>
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
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Amount']}
              contentStyle={{ 
                backgroundColor: '#fef3c7', 
                border: '1px solid #f59e0b',
                borderRadius: '8px'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CozyExpenseChart;