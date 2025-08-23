import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PixelFinancialSummaryCardProps {
  title: string;
  amount: number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: React.ReactNode;
}

const PixelFinancialSummaryCard = ({ 
  title, 
  amount, 
  change, 
  changeType = 'increase',
  icon 
}: PixelFinancialSummaryCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <Card className="bg-gradient-to-br from-pink-100 to-purple-100 border-4 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-pulse-slow pixel-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold text-purple-800 pixel-font">{title}</CardTitle>
        <div className="text-purple-600 animate-bounce-slow">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-purple-900 pixel-font animate-fade-in">{formatCurrency(amount)}</div>
        {change !== undefined && (
          <div className="flex items-center text-xs text-purple-700 mt-1 animate-slide-up">
            {changeType === 'increase' ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1 animate-bounce" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400 mr-1 animate-bounce" />
            )}
            <span className={changeType === 'increase' ? 'text-green-500' : 'text-red-400'}>
              {Math.abs(change)}% from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PixelFinancialSummaryCard;