import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const recentTransactions: Transaction[] = [
  { id: '1', description: 'Salary', amount: 3500, type: 'income', category: 'Work', date: '2024-01-15' },
  { id: '2', description: 'Grocery Store', amount: -85.50, type: 'expense', category: 'Food', date: '2024-01-14' },
  { id: '3', description: 'Gas Station', amount: -45.00, type: 'expense', category: 'Transportation', date: '2024-01-13' },
  { id: '4', description: 'Freelance Project', amount: 500, type: 'income', category: 'Work', date: '2024-01-12' },
  { id: '5', description: 'Netflix Subscription', amount: -15.99, type: 'expense', category: 'Entertainment', date: '2024-01-11' }
];

const RecentTransactions = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(value));
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{transaction.category}</Badge>
                <span className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;