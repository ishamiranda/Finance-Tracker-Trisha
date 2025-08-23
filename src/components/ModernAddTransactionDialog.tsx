import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Transaction } from "@/types/finance";

interface ModernAddTransactionDialogProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  currency: string;
}

const categories = [
  'Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Work', 'Other'
];

const ModernAddTransactionDialog = ({ onAddTransaction, currency }: ModernAddTransactionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0]
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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatNumber(value);
    setFormData({ ...formData, amount: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) return;

    onAddTransaction({
      description: formData.description,
      amount: parseNumber(formData.amount),
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
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 text-lg font-semibold">
          <Plus className="h-5 w-5 mr-2" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-2">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-gray-200 rounded-xl h-12 focus:border-blue-400 focus:ring-blue-400"
              placeholder="Enter description"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-semibold text-gray-700">Amount ({currency})</Label>
            <Input
              id="amount"
              type="text"
              value={formData.amount}
              onChange={handleAmountChange}
              className="border-gray-200 rounded-xl h-12 focus:border-blue-400 focus:ring-blue-400"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-semibold text-gray-700">Type</Label>
            <Select value={formData.type} onValueChange={(value: 'income' | 'expense') => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="border-gray-200 rounded-xl h-12 focus:border-blue-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border-0 rounded-2xl shadow-xl">
                <SelectItem value="income" className="rounded-xl">Income</SelectItem>
                <SelectItem value="expense" className="rounded-xl">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-gray-700">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="border-gray-200 rounded-xl h-12 focus:border-blue-400">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border-0 rounded-2xl shadow-xl">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="rounded-xl">{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-semibold text-gray-700">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="border-gray-200 rounded-xl h-12 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Add Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModernAddTransactionDialog;