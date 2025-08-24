import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";
import { Goal } from "@/types/finance";

interface ModernAddGoalDialogProps {
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  currency: string;
}

const ModernAddGoalDialog = ({ onAddGoal, currency }: ModernAddGoalDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: ''
  });

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

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatNumber(value);
    setFormData({ ...formData, targetAmount: formatted });
  };

  const handleCurrentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatNumber(value);
    setFormData({ ...formData, currentAmount: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.targetAmount || !formData.deadline || !formData.category) return;

    onAddGoal({
      title: formData.title,
      targetAmount: parseNumber(formData.targetAmount),
      currentAmount: parseNumber(formData.currentAmount),
      deadline: formData.deadline,
      category: formData.category
    });

    setFormData({
      title: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
      category: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200">
          <Target className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/95 dark:bg-gray-900 backdrop-blur-md border-0 dark:border-gray-700 shadow-2xl rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">Add Financial Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Goal Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-gray-200 dark:border-gray-700 rounded-xl h-12 focus:border-purple-400 focus:ring-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="e.g., Emergency Fund"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="targetAmount" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Target Amount ({currency})</Label>
            <Input
              id="targetAmount"
              type="text"
              value={formData.targetAmount}
              onChange={handleTargetAmountChange}
              className="border-gray-200 dark:border-gray-700 rounded-xl h-12 focus:border-purple-400 focus:ring-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="10,000.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentAmount" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Amount ({currency})</Label>
            <Input
              id="currentAmount"
              type="text"
              value={formData.currentAmount}
              onChange={handleCurrentAmountChange}
              className="border-gray-200 dark:border-gray-700 rounded-xl h-12 focus:border-purple-400 focus:ring-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border-gray-200 dark:border-gray-700 rounded-xl h-12 focus:border-purple-400 focus:ring-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="e.g., Savings, Travel"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Target Date</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="border-gray-200 dark:border-gray-700 rounded-xl h-12 focus:border-purple-400 focus:ring-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Create Goal
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModernAddGoalDialog;