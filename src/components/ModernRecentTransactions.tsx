import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Trash2 } from "lucide-react";
import { Transaction } from "@/types/finance";

interface ModernRecentTransactionsProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  currency: string;
}

const ModernRecentTransactions = ({ transactions, onDeleteTransaction, currency }: ModernRecentTransactionsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(Math.abs(value));
  };

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-2 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="px-4 pt-4">
        <CardTitle className="text-xl font-bold text-gray-900 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
          💳 Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <div 
              key={transaction.id} 
              className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50/80 rounded-2xl hover:bg-gray-100/80 transition-all duration-200 group border border-gray-100"
              style={{ 
                animationDelay: `${index * 50}ms`,
                animation: 'slideInFromLeft 0.3s ease-out forwards'
              }}
            >
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <div className={`p-3 rounded-full ${
                  transaction.type === 'income' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-5 w-5" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5" />
                  )}
                </div>
                <div className="text-center md:text-left">
                  <p className="font-semibold text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3 mt-2 md:mt-0">
                <Badge 
                  variant="secondary" 
                  className="bg-purple-100 text-purple-800 hover:bg-purple-200 rounded-full px-3 py-1 border border-purple-200"
                >
                  {transaction.category}
                </Badge>
                <span className={`font-bold text-lg ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {recentTransactions.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              <div className="text-6xl mb-4">💸</div>
              <p className="text-lg font-medium text-gray-800">No transactions yet</p>
              <p className="text-sm text-gray-600">Add your first transaction to get started!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernRecentTransactions;