import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ModernFinancialSummaryCardProps {
  title: string;
  amount: number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: React.ReactNode;
  currency: string;
}

const ModernFinancialSummaryCard = ({ 
  title, 
  amount, 
  change, 
  changeType = 'increase',
  icon,
  currency
}: ModernFinancialSummaryCardProps) => {
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
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-3xl overflow-hidden group">
      <CardHeader className="flex flex-col md:flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wide text-center md:text-left w-full">
          {title}
        </CardTitle>
        <div className="mt-2 md:mt-0 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight text-center md:text-left">
          {formatCurrency(amount)}
        </div>
        {change !== undefined && (
          <div className="flex items-center justify-center md:justify-start text-sm">
            {changeType === 'increase' ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`font-medium ${changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModernFinancialSummaryCard;