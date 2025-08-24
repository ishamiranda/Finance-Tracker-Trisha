import ModernFinancialSummaryCard from "@/components/ModernFinancialSummaryCard";
import ModernAddTransactionDialog from "@/components/ModernAddTransactionDialog";
import ExportAndFilterSection from "@/components/ExportAndFilterSection";
import CurrencySelector from "@/components/CurrencySelector";
import ThemeToggle from "@/components/ThemeToggle";
import FinancialTabs from "@/components/FinancialTabs";
import Footer from "@/components/Footer";
import ComplimentGift from "@/components/ComplimentGift";
import { DollarSign, TrendingUp, CreditCard, PiggyBank, LogOut } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Transaction, Goal } from "@/types/finance";
import { showSuccess, showError } from "@/utils/toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/components/SessionContextProvider";
import { signOut } from "@/integrations/supabase/auth";
import { Button } from "@/components/ui/button";

const Index = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const userId = session?.user?.id;

  const [selectedCurrency, setSelectedCurrency] = useLocalStorage<string>('selected-currency', 'USD');

  // Fetch transactions
  const { data: transactions = [], isLoading: isLoadingTransactions } = useQuery<Transaction[]>({
    queryKey: ['transactions', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });
      if (error) throw error;
      return data.map(t => ({
        ...t,
        amount: parseFloat(t.amount), // Ensure amount is number
        date: t.date // Keep date as string for input compatibility
      })) as Transaction[];
    },
    enabled: !!userId,
  });

  // Fetch goals
  const { data: goals = [], isLoading: isLoadingGoals } = useQuery<Goal[]>({
    queryKey: ['goals', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', userId)
        .order('deadline', { ascending: true });
      if (error) throw error;
      return data.map(g => ({
        ...g,
        targetAmount: parseFloat(g.target_amount), // Ensure amount is number
        currentAmount: parseFloat(g.current_amount), // Ensure amount is number
        deadline: g.deadline // Keep date as string for input compatibility
      })) as Goal[];
    },
    enabled: !!userId,
  });

  // Add Transaction Mutation
  const addTransactionMutation = useMutation({
    mutationFn: async (transactionData: Omit<Transaction, 'id'>) => {
      if (!userId) throw new Error("User not authenticated.");
      const { data, error } = await supabase
        .from('transactions')
        .insert({ ...transactionData, user_id: userId, amount: transactionData.amount.toFixed(2) })
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
      showSuccess('Transaction added successfully! 🎉');
    },
    onError: (error) => {
      showError(`Failed to add transaction: ${error.message}`);
    },
  });

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    addTransactionMutation.mutate(transactionData);
  };

  // Delete Transaction Mutation
  const deleteTransactionMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', userId); // Ensure user can only delete their own
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
      showSuccess('Transaction deleted! 🗑️');
    },
    onError: (error) => {
      showError(`Failed to delete transaction: ${error.message}`);
    },
  });

  const deleteTransaction = (id: string) => {
    deleteTransactionMutation.mutate(id);
  };

  // Add Goal Mutation
  const addGoalMutation = useMutation({
    mutationFn: async (goalData: Omit<Goal, 'id'>) => {
      if (!userId) throw new Error("User not authenticated.");
      const { data, error } = await supabase
        .from('goals')
        .insert({ 
          ...goalData, 
          user_id: userId, 
          target_amount: goalData.targetAmount.toFixed(2),
          current_amount: goalData.currentAmount.toFixed(2)
        })
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals', userId] });
      showSuccess('Goal added successfully! 🎯');
    },
    onError: (error) => {
      showError(`Failed to add goal: ${error.message}`);
    },
  });

  const addGoal = (goalData: Omit<Goal, 'id'>) => {
    addGoalMutation.mutate(goalData);
  };

  // Update Goal Mutation
  const updateGoalMutation = useMutation({
    mutationFn: async ({ id, currentAmount }: { id: string; currentAmount: number }) => {
      const { data, error } = await supabase
        .from('goals')
        .update({ current_amount: currentAmount.toFixed(2) })
        .eq('id', id)
        .eq('user_id', userId) // Ensure user can only update their own
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals', userId] });
      showSuccess('Goal updated! 💪');
    },
    onError: (error) => {
      showError(`Failed to update goal: ${error.message}`);
    },
  });

  const updateGoal = (id: string, currentAmount: number) => {
    updateGoalMutation.mutate({ id, currentAmount });
  };

  // Delete Goal Mutation
  const deleteGoalMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id)
        .eq('user_id', userId); // Ensure user can only delete their own
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals', userId] });
      showSuccess('Goal deleted! 🗑️');
    },
    onError: (error) => {
      showError(`Failed to delete goal: ${error.message}`);
    },
  });

  const deleteGoal = (id: string) => {
    deleteGoalMutation.mutate(id);
  };

  // Calculate financial summary
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalBalance = totalIncome - totalExpenses;
  const totalSavings = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  if (isLoadingTransactions || isLoadingGoals) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading financial data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-6 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Modern Header */}
        <div 
          className="mb-12 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 animate-slide-in-top transition-colors duration-300"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div className="text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-3">
                <span className="block sm:inline bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Trisha's
                </span>
                <span className="block sm:inline text-black dark:text-white sm:ml-3">
                  Finance Tracker
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
                Your modern financial dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <ComplimentGift />
              <CurrencySelector 
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              <Button
                onClick={signOut}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Logout</span>
              </Button>
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
            transactions={transactions}
            currency={selectedCurrency}
          />
        </div>

        {/* Financial Tabs Section */}
        <div className="animate-scale-in" style={{ animationDelay: '500ms' }}>
          <FinancialTabs
            transactions={transactions}
            goals={goals}
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