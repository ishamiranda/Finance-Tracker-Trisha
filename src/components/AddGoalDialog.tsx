import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";
import { Goal } from "@/types/finance";

interface AddGoalDialogProps {
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
}

const AddGoalDialog = ({ onAddGoal }: AddGoalDialogProps) => {
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
        <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
          <Target className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-amber-50 border-amber-200">
        <DialogHeader>
          <DialogTitle className="text-amber-900">Add Financial Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-amber-800">Goal Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-amber-200 focus:border-amber-400"
              placeholder="e.g., Emergency Fund"
            />
          </div>
          
          <div>
            <Label htmlFor="targetAmount" className="text-amber-800">Target Amount</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              className="border-amber-200 focus:border-amber-400"
              placeholder="10000.00"
            />
          </div>

          <div>
            <Label htmlFor="currentAmount" className="text-amber-800">Current Amount</Label>
            <Input
              id="currentAmount"
              type="number"
              step="0.01"
              value={formData.currentAmount}
              onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
              className="border-amber-200 focus:border-amber-400"
              placeholder="0.00"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-amber-800">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border-amber-200 focus:border-amber-400"
              placeholder="e.g., Savings, Travel"
            />
          </div>

          <div>
            <Label htmlFor="deadline" className="text-amber-800">Target Date</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="border-amber-200 focus:border-amber-400"
            />
          </div>

          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
            Add Goal
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;