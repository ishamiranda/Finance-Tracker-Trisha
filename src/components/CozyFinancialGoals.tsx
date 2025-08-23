import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Calendar, Plus, Trash2 } from "lucide-react";
import { Goal } from "@/types/finance";
import { useState } from "react";
import AddGoalDialog from "./AddGoalDialog";

interface CozyFinancialGoalsProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onUpdateGoal: (id: string, currentAmount: number) => void;
  onDeleteGoal: (id: string) => void;
}

const CozyFinancialGoals = ({ goals, onAddGoal, onUpdateGoal, onDeleteGoal }: CozyFinancialGoalsProps) => {
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState<string>('');

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

  const handleEditClick = (goal: Goal) => {
    setEditingGoal(goal.id);
    setEditAmount(goal.currentAmount.toString());
  };

  const handleSaveEdit = (goalId: string) => {
    const amount = parseFloat(editAmount);
    if (!isNaN(amount)) {
      onUpdateGoal(goalId, amount);
    }
    setEditingGoal(null);
    setEditAmount('');
  };

  return (
    <Card className="col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-amber-900 flex items-center gap-2">
            🎯 Financial Goals
          </CardTitle>
          <AddGoalDialog onAddGoal={onAddGoal} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const percentage = (goal.currentAmount / goal.targetAmount) * 100;
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <div key={goal.id} className="space-y-3 p-4 bg-white/50 border border-amber-100 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-amber-900">{goal.title}</h3>
                    <p className="text-sm text-amber-700">{goal.category}</p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    {editingGoal === goal.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="w-24 h-8 text-sm border-amber-200"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(goal.id)}
                          className="bg-green-600 hover:bg-green-700 text-white h-8"
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="text-right">
                          <p className="font-medium text-amber-900">{formatCurrency(goal.currentAmount)}</p>
                          <p className="text-sm text-amber-700">
                            of {formatCurrency(goal.targetAmount)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(goal)}
                          className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteGoal(goal.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <Progress value={percentage} className="h-3 bg-amber-100" />
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-amber-700">
                    {percentage.toFixed(1)}% complete
                  </span>
                  <span className="text-amber-700">
                    {formatCurrency(remaining)} remaining
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-amber-700">
                  <Calendar className="h-4 w-4" />
                  <span>Target: {formatDate(goal.deadline)}</span>
                </div>
              </div>
            );
          })}
          {goals.length === 0 && (
            <div className="text-center py-8 text-amber-600">
              <p>No goals set yet. Create your first financial goal! 🌟</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CozyFinancialGoals;