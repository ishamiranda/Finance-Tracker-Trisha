import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetItem {
  category: string;
  budgeted: number;
  spent: number;
  color: string;
}

const budgetData: BudgetItem[] = [
  { category: 'Housing', budgeted: 1200, spent: 1200, color: 'bg-blue-500' },
  { category: 'Food', budgeted: 500, spent: 400, color: 'bg-green-500' },
  { category: 'Transportation', budgeted: 350, spent: 300, color: 'bg-yellow-500' },
  { category: 'Entertainment', budgeted: 250, spent: 200, color: 'bg-purple-500' },
  { category: 'Utilities', budgeted: 200, spent: 150, color: 'bg-red-500' }
];

const BudgetProgress = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {budgetData.map((item) => {
            const percentage = (item.spent / item.budgeted) * 100;
            const isOverBudget = percentage > 100;
            
            return (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(item.spent)} / {formatCurrency(item.budgeted)}
                  </span>
                </div>
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className="h-2"
                />
                <div className="flex justify-between items-center text-xs">
                  <span className={`${isOverBudget ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {percentage.toFixed(1)}% used
                  </span>
                  {isOverBudget && (
                    <span className="text-red-500 font-medium">
                      Over budget by {formatCurrency(item.spent - item.budgeted)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;