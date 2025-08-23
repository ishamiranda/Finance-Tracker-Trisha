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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format number with commas
  const formatNumber = (value: string) => {
    // Remove all non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '');
    
    // Split by decimal point
    const parts = cleanValue.split('.');
    
    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Limit to 2 decimal places
    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2);
    }
    
    return parts.join('.');
  };

  // Parse formatted number back to float
  const parseNumber = (value: string) => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  const handleEditClick = (goal: Goal) => {
    setEditingGoal(goal.id);
    // Format the current amount with commas when editing starts
    setEditAmount(formatNumber(goal.currentAmount.toString()));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatNumber(value);
    setEditAmount(formatted);
  };

  const handleSaveEdit = (goalId: string) => {
    const amount = parseNumber(editAmount);
    if (!isNaN(amount)) {
      onUpdateGoal(goalId, amount);
    }
    setEditingGoal(null);
    setEditAmount('');
  };

  return (
    <Card className="col-span-2 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-3xl overflow-hidden animate-gentle-float">
      <CardHeader className="px-4 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-bold text-gray-900 text-center md:text-left animate-wiggle">
            🎯 Financial Goals
            <span className="inline-block ml-2 animate-sparkle">✨</span>
          </CardTitle>
          <div className="hover-bounce animate-float-gentle">
            <ModernAddGoalDialog onAddGoal={onAddGoal} currency={currency} />
          </div>
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
                className="space-y-4 p-6 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-2xl border border-purple-200/50 group hover:shadow-md transition-all duration-300 animate-slide-in-bounce hover-lift"
                style={{ 
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-gray-900 text-lg animate-fade-in-up">
                      {goal.title}
                      <span className="inline-block ml-1 animate-heart-beat">💖</span>
                    </h3>
                    <p className="text-sm text-purple-700 font-medium animate-slide-in-left">
                      {goal.category}
                      <span className="inline-block ml-1 animate-sparkle">✨</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {editingGoal === goal.id ? (
                      <div className="flex items-center gap-2 animate-scale-in-bounce">
                        <Input
                          type="text"
                          value={editAmount}
                          onChange={handleAmountChange}
                          className="w-32 h-10 text-sm border-purple-200 rounded-xl focus:border-purple-400 text-gray-900 animate-pulse-soft"
                          placeholder="0.00"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(goal.id)}
                          className="bg-green-500 hover:bg-green-600 text-white h-10 rounded-xl hover-tada animate-bounce-cute"
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="text-center animate-fade-in-up">
                          <p className="font-bold text-gray-900 text-lg animate-scale-in-bounce">
                            {formatCurrency(goal.currentAmount)}
                          </p>
                          <p className="text-sm text-gray-600 animate-slide-in-left">
                            of {formatCurrency(goal.targetAmount)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(goal)}
                          className="text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover-wiggle"
                        >
                          <Edit3 className="h-4 w-4 animate-float-gentle" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteGoal(goal.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover-tada"
                        >
                          <Trash2 className="h-4 w-4 animate-wiggle" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 text-center md:text-left">
                  <Progress 
                    value={percentage} 
                    className="h-3 bg-purple-100 rounded-full overflow-hidden animate-pulse-soft"
                  />
                  <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-2 animate-slide-in-left">
                    <span className="text-purple-700 font-medium animate-bounce-cute">
                      {percentage.toFixed(1)}% complete
                      <span className="inline-block ml-1 animate-sparkle">✨</span>
                    </span>
                    <span className="text-gray-700 animate-fade-in-up">
                      {formatCurrency(remaining)} remaining
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-700 animate-slide-in-bounce">
                  <Calendar className="h-4 w-4 text-purple-500 animate-wiggle" />
                  <span>Target: {formatDate(goal.deadline)}</span>
                  <span className="inline-block ml-1 animate-heart-beat">💖</span>
                </div>
              </div>
            );
          })}
          {goals.length === 0 && (
            <div className="text-center py-12 text-gray-600 animate-bounce-cute">
              <div className="text-6xl mb-4 animate-float-gentle">🎯</div>
              <p className="text-lg font-medium text-gray-800 animate-wiggle">No goals set yet</p>
              <p className="text-sm text-gray-600 animate-sparkle">Create your first financial goal to get started!</p>
              <span className="inline-block mt-2 animate-heart-beat text-2xl">💖</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernFinancialGoals;