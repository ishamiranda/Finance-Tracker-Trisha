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
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(Math.abs(value));
    } catch (error) {
      // Fallback if currency is invalid
      return `$${Math.abs(value).toFixed(2)}`;
    }
  };

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="px-4 pt-4">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center md:text-left">
          💳 Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {recentTransactions.map((transaction, index) => (
            <div 
              key={transaction.id} 
              className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50/80 dark:bg-gray-700/30 rounded-2xl hover:bg-gray-100/80 dark:hover:bg-gray-600/40 transition-all duration-200 group border border-gray-100 dark:border-gray-600/50 gap-4"
              style={{ 
                animationDelay: `${index * 50}ms`,
                animation: 'slideInFromLeft 0.3s ease-out forwards'
              }}
            >
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
                <div className={`p-3 rounded-full flex-shrink-0 ${
                  transaction.type === 'income' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                    : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-5 w-5" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5" />
                  )}
                </div>
                <div className="text-center md:text-left flex-grow">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-base">{transaction.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto justify-center md:justify-end">
                <Badge 
                  variant="secondary" 
                  className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/40 rounded-full px-3 py-1 border border-purple-200 dark:border-purple-700/50 text-xs"
                >
                  {transaction.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-lg ${
                    transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {recentTransactions.length === 0 && (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              <div className="text-6xl mb-4">💸</div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">No transactions yet</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add your first transaction to get started!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernRecentTransactions;