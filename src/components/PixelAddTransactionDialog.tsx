import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Transaction } from "@/types/finance";

interface PixelAddTransactionDialogProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const categories = [
  'Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Work', 'Other'
];

const PixelAddTransactionDialog = ({ onAddTransaction }: PixelAddTransactionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) return;

    onAddTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date
    });

    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pink-400 hover:bg-pink-500 text-pink-900 pixel-border pixel-font animate-bounce-slow">
          <Plus className="h-4 w-4 mr-2 animate-spin-slow" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-pink-100 to-purple-100 border-4 border-pink-200 pixel-border animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-purple-900 pixel-font animate-wiggle">Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-slide-in" style={{ animationDelay: '100ms' }}>
            <Label htmlFor="description" className="text-purple-800 pixel-font">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-2 border-pink-200 focus:border-pink-400 pixel-border pixel-font"
              placeholder="Enter description"
            />
          </div>
          
          <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
            <Label htmlFor="amount" className="text-purple-800 pixel-font">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="border-2 border-pink-200 focus:border-pink-400 pixel-border pixel-font"
              placeholder="0.00"
            />
          </div>

          <div className="animate-slide-in" style={{ animationDelay: '300ms' }}>
            <Label htmlFor="type" className="text-purple-800 pixel-font">Type</Label>
            <Select value={formData.type} onValueChange={(value: 'income' | 'expense') => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="border-2 border-pink-200 focus:border-pink-400 pixel-border pixel-font">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="pixel-border">
                <SelectItem value="income" className="pixel-font">Income</SelectItem>
                <SelectItem value="expense" className="pixel-font">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="animate-slide-in" style={{ animationDelay: '400ms' }}>
            <Label htmlFor="category" className="text-purple-800 pixel-font">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="border-2 border-pink-200 focus:border-pink-400 pixel-border pixel-font">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="pixel-border">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="pixel-font">{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="animate-slide-in" style={{ animationDelay: '500ms' }}>
            <Label htmlFor="date" className="text-purple-800 pixel-font">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="border-2 border-pink-200 focus:border-pink-400 pixel-border pixel-font"
            />
          </div>

          <Button type="submit" className="w-full bg-purple-400 hover:bg-purple-500 text-purple-900 pixel-border pixel-font animate-bounce-on-hover">
            Add Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PixelAddTransactionDialog;