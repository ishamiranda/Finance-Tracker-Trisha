import ModernFinancialSummaryCard from "@/components/ModernFinancialSummaryCard";
import ModernAddTransactionDialog from "@/components/ModernAddTransactionDialog";
import ExportAndFilterSection from "@/components/ExportAndFilterSection";
import CurrencySelector from "@/components/CurrencySelector";
import ThemeToggle from "@/components/ThemeToggle";
import FinancialTabs from "@/components/FinancialTabs";
import Footer from "@/components/Footer";
import { DollarSign, TrendingUp, CreditCard, PiggyBank } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Transaction, Goal, FinancialData } from "@/types/finance";
import { showSuccess } from "@/utils/toast";

const initialData: FinancialData = {
  transactions: [],
  budgets: [],
  goals: []
};

const Index = () => {
  const [financialData, setFinancialData] = useLocalStorage<FinancialData>('financial-data', initialData);
  const [selectedCurrency, setSelectedCurrency] = useLocalStorage<string>('selected-currency', 'USD');

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Modern Header */}
        <div 
          className="mb-12 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 animate-slide-in-top transition-colors duration-300"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="text-left">
              <h1 className="text-5xl font-bold mb-3">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Trisha Mae
                </span>
                <span className="text-black dark:text-white ml-3">
                  Finance Tracker
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                Your modern financial dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <CurrencySelector 
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
            </div>
          </div>
          <div className="text-left animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <ModernAddTransactionDialog 
              onAddTransaction={addTransaction} 
              currency={selectedCurrency}
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="animate-slide-in-left" style={{ animationDelay: '100ms' }}>
            <ModernFinancialSummaryCard
              title="Total Balance"
              amount={totalBalance}
              icon={<DollarSign className="h-5 w-5" />}
              currency={selectedCurrency}
            />
          </div>
          <div className="animate-slide-in-left" style={{ animationDelay: '200ms' }}>
            <ModernFinancialSummaryCard
              title="Monthly Income"
              amount={totalIncome}
              icon={<TrendingUp className="h-5 w-5" />}
              currency={selectedCurrency}
            />
          </div>
          <div className="animate-slide-in-left" style={{ animationDelay: '300ms' }}>
            <ModernFinancialSummaryCard
              title="Monthly Expenses"
              amount={totalExpenses}
              icon={<CreditCard className="h-5 w-5" />}
              currency={selectedCurrency}
            />
          </div>
          <div className="animate-slide-in-left" style={{ animationDelay: '400ms' }}>
            <ModernFinancialSummaryCard
              title="Total Savings"
              amount={totalSavings}
              icon={<PiggyBank className="h-5 w-5" />}
              currency={selectedCurrency}
            />
          </div>
        </div>

        {/* Export and Filter Section */}
        <div className="animate-scale-in" style={{ animationDelay: '450ms' }}>
          <ExportAndFilterSection 
            transactions={financialData.transactions}
            currency={selectedCurrency}
          />
        </div>

        {/* Financial Tabs Section */}
        <div className="animate-scale-in" style={{ animationDelay: '500ms' }}>
          <FinancialTabs
            transactions={financialData.transactions}
            goals={financialData.goals}
            onDeleteTransaction={deleteTransaction}
            onAddGoal={addGoal}
            onUpdateGoal={updateGoal}
            onDeleteGoal={deleteGoal}
            currency={selectedCurrency}
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;