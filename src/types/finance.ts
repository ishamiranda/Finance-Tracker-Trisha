export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  color: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

export interface FinancialData {
  transactions: Transaction[];
  budgets: BudgetItem[];
  goals: Goal[];
}