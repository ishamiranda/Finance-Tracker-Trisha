import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Calendar, Plus, Trash2, Edit3 } from "lucide-react";
import { Goal } from "@/types/finance";
import { useState } from "react";
import ModernAddGoalDialog from "./ModernAddGoalDialog";

interface ModernFinancialGoalsProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onUpdateGoal: (id: string, currentAmount: number) => void;
  onDeleteGoal: (id: string) => void;
  currency: string;
}

const ModernFinancialGoals = ({ goals, onAddGoal, onUpdateGoal, onDeleteGoal, currency }: ModernFinancialGoalsProps) => {
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState<string>('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
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
    <Card className="col-span-2 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="px-4 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-bold text-gray-900 text-center md:text-left">
            🎯 Financial Goals
          </CardTitle>
          <ModernAddGoalDialog onAddGoal={onAddGoal} currency={currency} />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-6">
          {goals.map((goal, index) => {
            const percentage = (goal.currentAmount / goal.targetAmount) * 100;
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <div 
                key={goal.id} 
                className="space-y-4 p-6 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-2xl border border-purple-200/50 group hover:shadow-md transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInFromRight 0.4s ease-out forwards'
                }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-gray-900 text-lg">{goal.title}</h3>
                    <p className="text-sm text-purple-700 font-medium">{goal.category}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    {editingGoal === goal.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="w-32 h-10 text-sm border-purple-200 rounded-xl focus:border-purple-400 text-gray-900"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(goal.id)}
                          className="bg-green-500 hover:bg-green-600 text-white h-10 rounded-xl"
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="text-center">
                          <p className="font-bold text-gray-900 text-lg">{formatCurrency(goal.currentAmount)}</p>
                          <p className="text-sm text-gray-600">
                            of {formatCurrency(goal.targetAmount)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(goal)}
                          className="text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteGoal(goal.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 text-center md:text-left">
                  <Progress 
                    value={percentage} 
                    className="h-3 bg-purple-100 rounded-full overflow-hidden"
                  />
                  <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <span className="text-purple-700 font-medium">
                      {percentage.toFixed(1)}% complete
                    </span>
                    <span className="text-gray-700">
                      {formatCurrency(remaining)} remaining
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-700">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <span>Target: {formatDate(goal.deadline)}</span>
                </div>
              </div>
            );
          })}
          {goals.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-lg font-medium text-gray-800">No goals set yet</p>
              <p className="text-sm text-gray-600">Create your first financial goal to get started!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernFinancialGoals;