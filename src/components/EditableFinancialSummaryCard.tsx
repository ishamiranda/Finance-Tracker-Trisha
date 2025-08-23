import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface EditableFinancialSummaryCardProps {
  title: string;
  amount: number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: React.ReactNode;
}

const EditableFinancialSummaryCard = ({ 
  title, 
  amount, 
  change, 
  changeType = 'increase',
  icon 
}: EditableFinancialSummaryCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-amber-800">{title}</CardTitle>
        <div className="text-amber-600">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-amber-900">{formatCurrency(amount)}</div>
        {change !== undefined && (
          <div className="flex items-center text-xs text-amber-700 mt-1">
            {changeType === 'increase' ? (
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={changeType === 'increase' ? 'text-green-600' : 'text-red-500'}>
              {Math.abs(change)}% from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditableFinancialSummaryCard;