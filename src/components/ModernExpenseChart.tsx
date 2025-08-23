import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Transaction } from "@/types/finance";

interface ModernExpenseChartProps {
  transactions: Transaction[];
  currency: string;
}

const modernColors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1'];

const ModernExpenseChart = ({ transactions, currency }: ModernExpenseChartProps) => {
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
          color: modernColors[acc.length % modernColors.length]
        });
      }
      return acc;
    }, [] as { name: string; value: number; color: string }[]);

  const formatCurrency = (value: number) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    } catch (error) {
      // Fallback if currency is invalid
      return `$${value.toFixed(2)}`;
    }
  };

  return (
    <Card className="col-span-2 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="px-4 pt-4">
        <CardTitle className="text-xl font-bold text-gray-900 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
          📊 Expense Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {expenseData.length > 0 ? (
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
                formatter={(value) => [formatCurrency(Number(value)), 'Amount']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  color: '#1f2937'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex flex-col items-center justify-center text-gray-600">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-lg font-medium text-gray-800 text-center">No expenses to display yet</p>
            <p className="text-sm text-gray-600 text-center">Add some transactions to see your breakdown</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModernExpenseChart;