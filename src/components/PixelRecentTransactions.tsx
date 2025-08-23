import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Trash2 } from "lucide-react";
import { Transaction } from "@/types/finance";

interface PixelRecentTransactionsProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const PixelRecentTransactions = ({ transactions, onDeleteTransaction }: PixelRecentTransactionsProps) => {
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
    <Card className="col-span-2 bg-gradient-to-br from-green-100 to-emerald-100 border-4 border-green-200 shadow-lg pixel-border animate-float-delayed">
      <CardHeader>
        <CardTitle className="text-green-900 flex items-center gap-2 pixel-font animate-wiggle-delayed">
          📝 Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction, index) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 bg-white/70 border-2 border-green-100 pixel-border hover:bg-white/90 transition-all duration-300 hover:scale-102 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 pixel-border ${
                  transaction.type === 'income' ? 'bg-green-200 animate-pulse-green' : 'bg-red-200 animate-pulse-red'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-700 animate-bounce" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600 animate-bounce" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-green-900 pixel-font">{transaction.description}</p>
                  <p className="text-sm text-green-700 pixel-font">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-yellow-200 text-yellow-800 pixel-border pixel-font animate-wiggle-slow">
                  {transaction.category}
                </Badge>
                <span className={`font-bold pixel-font ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 pixel-border animate-bounce-on-hover"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {recentTransactions.length === 0 && (
            <div className="text-center py-8 text-green-600 animate-bounce-slow">
              <p className="pixel-font text-lg">No transactions yet. Add your first transaction to get started! 🌟</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PixelRecentTransactions;