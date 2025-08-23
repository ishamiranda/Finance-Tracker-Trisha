import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";
import { Goal } from "@/types/finance";

interface PixelAddGoalDialogProps {
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
}

const PixelAddGoalDialog = ({ onAddGoal }: PixelAddGoalDialogProps) => {
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
        <Button variant="outline" className="border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-100 pixel-border pixel-font animate-bounce-on-hover">
          <Target className="h-4 w-4 mr-2 animate-spin-slow" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-200 pixel-border animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-orange-900 pixel-font animate-wiggle">Add Financial Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-slide-in" style={{ animationDelay: '100ms' }}>
            <Label htmlFor="title" className="text-orange-800 pixel-font">Goal Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-2 border-yellow-200 focus:border-yellow-400 pixel-border pixel-font"
              placeholder="e.g., Emergency Fund"
            />
          </div>
          
          <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
            <Label htmlFor="targetAmount" className="text-orange-800 pixel-font">Target Amount</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              className="border-2 border-yellow-200 focus:border-yellow-400 pixel-border pixel-font"
              placeholder="10000.00"
            />
          </div>

          <div className="animate-slide-in" style={{ animationDelay: '300ms' }}>
            <Label htmlFor="currentAmount" className="text-orange-800 pixel-font">Current Amount</Label>
            <Input
              id="currentAmount"
              type="number"
              step="0.01"
              value={formData.currentAmount}
              onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
              className="border-2 border-yellow-200 focus:border-yellow-400 pixel-border pixel-font"
              placeholder="0.00"
            />
          </div>

          <div className="animate-slide-in" style={{ animationDelay: '400ms' }}>
            <Label htmlFor="category" className="text-orange-800 pixel-font">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border-2 border-yellow-200 focus:border-yellow-400 pixel-border pixel-font"
              placeholder="e.g., Savings, Travel"
            />
          </div>

          <div className="animate-slide-in" style={{ animationDelay: '500ms' }}>
            <Label htmlFor="deadline" className="text-orange-800 pixel-font">Target Date</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="border-2 border-yellow-200 focus:border-yellow-400 pixel-border pixel-font"
            />
          </div>

          <Button type="submit" className="w-full bg-orange-400 hover:bg-orange-500 text-orange-900 pixel-border pixel-font animate-bounce-on-hover">
            Add Goal
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PixelAddGoalDialog;