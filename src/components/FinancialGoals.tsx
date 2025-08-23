import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Calendar } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

const financialGoals: Goal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 6500,
    deadline: '2024-12-31',
    category: 'Savings'
  },
  {
    id: '2',
    title: 'Vacation Fund',
    targetAmount: 3000,
    currentAmount: 1200,
    deadline: '2024-06-30',
    category: 'Travel'
  },
  {
    id: '3',
    title: 'New Car Down Payment',
    targetAmount: 5000,
    currentAmount: 2800,
    deadline: '2024-09-30',
    category: 'Transportation'
  }
];

const FinancialGoals = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Financial Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {financialGoals.map((goal) => {
            const percentage = (goal.currentAmount / goal.targetAmount) * 100;
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <div key={goal.id} className="space-y-3 p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground">{goal.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(goal.currentAmount)}</p>
                    <p className="text-sm text-muted-foreground">
                      of {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>
                </div>
                
                <Progress value={percentage} className="h-2" />
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {percentage.toFixed(1)}% complete
                  </span>
                  <span className="text-muted-foreground">
                    {formatCurrency(remaining)} remaining
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Target: {formatDate(goal.deadline)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialGoals;