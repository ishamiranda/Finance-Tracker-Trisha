import { MadeWithDyad } from "@/components/made-with-dyad";
import FinancialSummaryCard from "@/components/FinancialSummaryCard";
import ExpenseChart from "@/components/ExpenseChart";
import RecentTransactions from "@/components/RecentTransactions";
import BudgetProgress from "@/components/BudgetProgress";
import FinancialGoals from "@/components/FinancialGoals";
import { DollarSign, TrendingUp, CreditCard, PiggyBank } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Personal Finance Dashboard</h1>
          <p className="text-lg text-gray-600">Track your income, expenses, and financial goals</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FinancialSummaryCard
            title="Total Balance"
            amount={12450.75}
            change={8.2}
            changeType="increase"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <FinancialSummaryCard
            title="Monthly Income"
            amount={4000}
            change={5.1}
            changeType="increase"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
          <FinancialSummaryCard
            title="Monthly Expenses"
            amount={2500}
            change={3.2}
            changeType="decrease"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          />
          <FinancialSummaryCard
            title="Savings"
            amount={8750.50}
            change={12.5}
            changeType="increase"
            icon={<PiggyBank className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <ExpenseChart />
          <RecentTransactions />
        </div>

        {/* Budget and Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <BudgetProgress />
          <FinancialGoals />
        </div>

        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;