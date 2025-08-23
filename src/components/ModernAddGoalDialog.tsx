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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.targetAmount || !formData.deadline || !formData.category) return;

    onAddGoal({
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount) || 0,
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
      <DialogContent className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">Add Financial Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Goal Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-gray-200 rounded-xl h-12 focus:border-purple-400 focus:ring-purple-400"
              placeholder="e.g., Emergency Fund"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="targetAmount" className="text-sm font-semibold text-gray-700">Target Amount ({currency})</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              className="border-gray-200 rounded-xl h-12 focus:border-purple-400 focus:ring-purple-400"
              placeholder="10000.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentAmount" className="text-sm font-semibold text-gray-700">Current Amount ({currency})</Label>
            <Input
              id="currentAmount"
              type="number"
              step="0.01"
              value={formData.currentAmount}
              onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
              className="border-gray-200 rounded-xl h-12 focus:border-purple-400 focus:ring-purple-400"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-gray-700">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border-gray-200 rounded-xl h-12 focus:border-purple-400 focus:ring-purple-400"
              placeholder="e.g., Savings, Travel"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-sm font-semibold text-gray-700">Target Date</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="border-gray-200 rounded-xl h-12 focus:border-purple-400 focus:ring-purple-400"
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