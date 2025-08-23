import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Calendar, Plus, Trash2 } from "lucide-react";
import { Goal } from "@/types/finance";
import { useState } from "react";
import PixelAddGoalDialog from "./PixelAddGoalDialog";

interface PixelFinancialGoalsProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onUpdateGoal: (id: string, currentAmount: number) => void;
  onDeleteGoal: (id: string) => void;
}

const PixelFinancialGoals = ({ goals, onAddGoal, onUpdateGoal, onDeleteGoal }: PixelFinancialGoalsProps) => {
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
    <Card className="col-span-2 bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-200 shadow-lg pixel-border animate-float-slow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-orange-900 flex items-center gap-2 pixel-font animate-wiggle-slow">
            🎯 Financial Goals
          </CardTitle>
          <PixelAddGoalDialog onAddGoal={onAddGoal} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal, index) => {
            const percentage = (goal.currentAmount / goal.targetAmount) * 100;
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <div 
                key={goal.id} 
                className="space-y-3 p-4 bg-white/70 border-2 border-yellow-100 pixel-border animate-slide-in-right"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-orange-900 pixel-font animate-fade-in">{goal.title}</h3>
                    <p className="text-sm text-orange-700 pixel-font">{goal.category}</p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    {editingGoal === goal.id ? (
                      <div className="flex items-center gap-2 animate-scale-in">
                        <Input
                          type="number"
                          step="0.01"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="w-24 h-8 text-sm border-2 border-yellow-200 pixel-border pixel-font"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(goal.id)}
                          className="bg-green-400 hover:bg-green-500 text-green-900 h-8 pixel-border pixel-font animate-bounce-on-hover"
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="text-right">
                          <p className="font-bold text-orange-900 pixel-font">{formatCurrency(goal.currentAmount)}</p>
                          <p className="text-sm text-orange-700 pixel-font">
                            of {formatCurrency(goal.targetAmount)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(goal)}
                          className="text-orange-600 hover:text-orange-800 hover:bg-orange-100 pixel-border animate-wiggle-on-hover"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteGoal(goal.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 pixel-border animate-bounce-on-hover"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <Progress 
                    value={percentage} 
                    className="h-4 bg-yellow-200 pixel-border animate-progress-fill" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 opacity-70 pixel-border animate-shimmer"></div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-orange-700 pixel-font animate-fade-in-delayed">
                    {percentage.toFixed(1)}% complete
                  </span>
                  <span className="text-orange-700 pixel-font animate-fade-in-delayed">
                    {formatCurrency(remaining)} remaining
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-orange-700 animate-slide-up">
                  <Calendar className="h-4 w-4 animate-bounce-slow" />
                  <span className="pixel-font">Target: {formatDate(goal.deadline)}</span>
                </div>
              </div>
            );
          })}
          {goals.length === 0 && (
            <div className="text-center py-8 text-orange-600 animate-bounce-slow">
              <p className="pixel-font text-lg">No goals set yet. Create your first financial goal! 🌟</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PixelFinancialGoals;