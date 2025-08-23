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
    <Card className="col-span-2 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-3xl overflow-hidden animate-gentle-float">
      <CardHeader className="px-4 pt-4">
        <CardTitle className="text-xl font-bold text-gray-900 text-center md:text-left animate-wiggle">
          💳 Recent Transactions
          <span className="inline-block ml-2 animate-sparkle">✨</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {recentTransactions.map((transaction, index) => (
            <div 
              key={transaction.id} 
              className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50/80 rounded-2xl hover:bg-gray-100/80 transition-all duration-200 group border border-gray-100 gap-4 animate-slide-in-bounce hover-lift"
              style={{ 
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
                <div className={`p-3 rounded-full flex-shrink-0 animate-pulse-soft hover-bounce ${
                  transaction.type === 'income' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-5 w-5 animate-bounce-cute" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 animate-wiggle" />
                  )}
                </div>
                <div className="text-center md:text-left flex-grow">
                  <p className="font-semibold text-gray-900 text-base animate-fade-in-up">
                    {transaction.description}
                    <span className="inline-block ml-1 animate-heart-beat">💖</span>
                  </p>
                  <p className="text-sm text-gray-600 animate-slide-in-left">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto justify-center md:justify-end">
                <Badge 
                  variant="secondary" 
                  className="bg-purple-100 text-purple-800 hover:bg-purple-200 rounded-full px-3 py-1 border border-purple-200 text-xs animate-float-gentle hover-wiggle"
                >
                  {transaction.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-lg animate-scale-in-bounce ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 hover-tada"
                  >
                    <Trash2 className="h-4 w-4 animate-wiggle" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {recentTransactions.length === 0 && (
            <div className="text-center py-12 text-gray-600 animate-bounce-cute">
              <div className="text-6xl mb-4 animate-float-gentle">💸</div>
              <p className="text-lg font-medium text-gray-800 animate-wiggle">No transactions yet</p>
              <p className="text-sm text-gray-600 animate-sparkle">Add your first transaction to get started!</p>
              <span className="inline-block mt-2 animate-heart-beat text-2xl">💖</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernRecentTransactions;