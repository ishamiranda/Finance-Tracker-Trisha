import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Edit, Trash2 } from "lucide-react";
import { Transaction } from "@/types/finance";

interface CozyRecentTransactionsProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const CozyRecentTransactions = ({ transactions, onDeleteTransaction }: CozyRecentTransactionsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(value));
  };

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-amber-900 flex items-center gap-2">
          📝 Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-white/50 border border-amber-100 rounded-lg hover:bg-white/70 transition-colors">
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
                  <p className="font-medium text-amber-900">{transaction.description}</p>
                  <p className="text-sm text-amber-700">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  {transaction.category}
                </Badge>
                <span className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {recentTransactions.length === 0 && (
            <div className="text-center py-8 text-amber-600">
              <p>No transactions yet. Add your first transaction to get started! 🌟</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CozyRecentTransactions;