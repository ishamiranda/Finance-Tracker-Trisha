import ModernFinancialSummaryCard from "@/components/ModernFinancialSummaryCard";
import ModernAddTransactionDialog from "@/components/ModernAddTransactionDialog";
import ExportAndFilterSection from "@/components/ExportAndFilterSection";
import CurrencySelector from "@/components/CurrencySelector";
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Modern Header with cute animations */}
        <div 
          className="mb-12 p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 animate-slide-in-bounce hover-lift"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-fade-in-up-bounce">
                Personal Finance
                <span className="inline-block ml-2 animate-sparkle">✨</span>
              </h1>
              <p className="text-xl text-gray-600 font-medium animate-fade-in-up-bounce animate-stagger-1">
                Your modern financial dashboard
                <span className="inline-block ml-1 animate-heart-beat">💖</span>
              </p>
            </div>
            <div className="animate-float-gentle">
              <CurrencySelector 
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
            </div>
          </div>
          <div className="text-left animate-scale-in-bounce animate-stagger-2">
            <div className="hover-tada">
              <ModernAddTransactionDialog 
                onAddTransaction={addTransaction} 
                currency={selectedCurrency}
              />
            </div>
          </div>
        </div>

        {/* Summary Cards with staggered cute animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="animate-slide-in-bounce animate-stagger-1 hover-bounce">
            <ModernFinancialSummaryCard
              title="Total Balance"
              amount={totalBalance}
              icon={<DollarSign className="h-5 w-5 animate-pulse-soft" />}
              currency={selectedCurrency}
            />
          </div>
          <div className="animate-slide-in-bounce animate-stagger-2 hover-bounce">
            <ModernFinancialSummaryCard
              title="Monthly Income"
              amount={totalIncome}
              icon={<TrendingUp className="h-5 w-5 animate-bounce-cute" />}
              currency={selectedCurrency}
            />
          </div>
          <div className="animate-slide-in-bounce animate-stagger-3 hover-bounce">
            <ModernFinancialSummaryCard
              title="Monthly Expenses"
              amount={totalExpenses}
              icon={<CreditCard className="h-5 w-5 animate-wiggle" />}
              currency={selectedCurrency}
            />
          </div>
          <div className="animate-slide-in-bounce animate-stagger-4 hover-bounce">
            <ModernFinancialSummaryCard
              title="Total Savings"
              amount={totalSavings}
              icon={<PiggyBank className="h-5 w-5 animate-float-gentle" />}
              currency={selectedCurrency}
            />
          </div>
        </div>

        {/* Export and Filter Section with cute animation */}
        <div className="animate-scale-in-bounce animate-stagger-5 hover-lift">
          <ExportAndFilterSection 
            transactions={financialData.transactions}
            currency={selectedCurrency}
          />
        </div>

        {/* Financial Tabs Section with jello animation */}
        <div className="animate-fade-in-up-bounce hover-jello">
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

        {/* Footer with gentle float */}
        <div className="animate-gentle-float">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;