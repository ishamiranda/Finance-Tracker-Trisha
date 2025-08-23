import { MadeWithDyad } from "@/components/made-with-dyad";
import PixelFinancialSummaryCard from "@/components/PixelFinancialSummaryCard";
import PixelExpenseChart from "@/components/PixelExpenseChart";
import PixelRecentTransactions from "@/components/PixelRecentTransactions";
import PixelFinancialGoals from "@/components/PixelFinancialGoals";
import PixelAddTransactionDialog from "@/components/PixelAddTransactionDialog";
import { DollarSign, TrendingUp, CreditCard, PiggyBank } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Transaction, Goal, FinancialData } from "@/types/finance";
import { showSuccess, showError } from "@/utils/toast";

const initialData: FinancialData = {
  transactions: [],
  budgets: [],
  goals: []
};

const Index = () => {
  const [financialData, setFinancialData] = useLocalStorage<FinancialData>('financial-data', initialData);

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString()
    };
    
    setFinancialData(prev => ({
      ...prev,
      transactions: [...prev.transactions, newTransaction]
    }));
    
    showSuccess('Transaction added successfully! 🎉');
  };

  const deleteTransaction = (id: string) => {
    setFinancialData(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id)
    }));
    showSuccess('Transaction deleted! 🗑️');
  };

  const addGoal = (goalData: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString()
    };
    
    setFinancialData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
    
    showSuccess('Goal added successfully! 🎯');
  };

  const updateGoal = (id: string, currentAmount: number) => {
    setFinancialData(prev => ({
      ...prev,
      goals: prev.goals.map(goal => 
        goal.id === id ? { ...goal, currentAmount } : goal
      )
    }));
    showSuccess('Goal updated! 💪');
  };

  const deleteGoal = (id: string) => {
    setFinancialData(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== id)
    }));
    showSuccess('Goal deleted! 🗑️');
  };

  // Calculate financial summary
  const totalIncome = financialData.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = financialData.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalBalance = totalIncome - totalExpenses;
  const totalSavings = financialData.goals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 p-6 animate-fade-in-slow">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Pixel Art Header */}
        <div className="text-center mb-8 p-6 bg-gradient-to-br from-yellow-200 to-pink-200 border-4 border-purple-300 pixel-border shadow-lg animate-float">
          <h1 className="text-5xl font-bold text-purple-900 mb-2 pixel-font animate-wiggle">
            🏠 Cozy Pixel Finance Dashboard
          </h1>
          <p className="text-lg text-purple-700 mb-4 pixel-font animate-fade-in-delayed">
            Your adorable 2D pixel space to manage finances! ✨
          </p>
          <div className="animate-bounce-slow">
            <PixelAddTransactionDialog onAddTransaction={addTransaction} />
          </div>
        </div>

        {/* Floating Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="animate-slide-in" style={{ animationDelay: '100ms' }}>
            <PixelFinancialSummaryCard
              title="Total Balance"
              amount={totalBalance}
              change={8.2}
              changeType="increase"
              icon={<DollarSign className="h-4 w-4" />}
            />
          </div>
          <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
            <PixelFinancialSummaryCard
              title="Monthly Income"
              amount={totalIncome}
              change={5.1}
              changeType="increase"
              icon={<TrendingUp className="h-4 w-4" />}
            />
          </div>
          <div className="animate-slide-in" style={{ animationDelay: '300ms' }}>
            <PixelFinancialSummaryCard
              title="Monthly Expenses"
              amount={totalExpenses}
              change={3.2}
              changeType="decrease"
              icon={<CreditCard className="h-4 w-4" />}
            />
          </div>
          <div className="animate-slide-in" style={{ animationDelay: '400ms' }}>
            <PixelFinancialSummaryCard
              title="Total Savings"
              amount={totalSavings}
              change={12.5}
              changeType="increase"
              icon={<PiggyBank className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Charts and Transactions with Staggered Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="animate-slide-in-right" style={{ animationDelay: '500ms' }}>
            <PixelExpenseChart transactions={financialData.transactions} />
          </div>
          <div className="animate-slide-in" style={{ animationDelay: '600ms' }}>
            <PixelRecentTransactions 
              transactions={financialData.transactions}
              onDeleteTransaction={deleteTransaction}
            />
          </div>
        </div>

        {/* Goals Section with Floating Animation */}
        <div className="grid grid-cols-1 gap-6">
          <div className="animate-scale-in" style={{ animationDelay: '700ms' }}>
            <PixelFinancialGoals 
              goals={financialData.goals}
              onAddGoal={addGoal}
              onUpdateGoal={updateGoal}
              onDeleteGoal={deleteGoal}
            />
          </div>
        </div>

        {/* Floating Footer */}
        <div className="text-center p-4 bg-gradient-to-br from-cyan-100 to-blue-100 border-2 border-cyan-200 pixel-border animate-float-slow">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Index;