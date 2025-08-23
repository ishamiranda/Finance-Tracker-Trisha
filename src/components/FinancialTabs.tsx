import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModernExpenseChart from "./ModernExpenseChart";
import ModernRecentTransactions from "./ModernRecentTransactions";
import ModernFinancialGoals from "./ModernFinancialGoals";
import { Transaction, Goal } from "@/types/finance";
import { PieChart, CreditCard, Target } from "lucide-react";

interface FinancialTabsProps {
  transactions: Transaction[];
  goals: Goal[];
  onDeleteTransaction: (id: string) => void;
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onUpdateGoal: (id: string, currentAmount: number) => void;
  onDeleteGoal: (id: string) => void;
  currency: string;
}

const FinancialTabs = ({
  transactions,
  goals,
  onDeleteTransaction,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  currency
}: FinancialTabsProps) => {
  const [activeTab, setActiveTab] = useState("expenses");

  return (
    <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-3xl overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-6 pb-2">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100/80 rounded-2xl p-1 h-12">
            <TabsTrigger 
              value="expenses" 
              className="rounded-xl font-semibold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2"
            >
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">Expense Breakdown</span>
              <span className="sm:hidden">Expenses</span>
            </TabsTrigger>
            <TabsTrigger 
              value="transactions" 
              className="rounded-xl font-semibold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Recent Transactions</span>
              <span className="sm:hidden">Transactions</span>
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className="rounded-xl font-semibold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Financial Goals</span>
              <span className="sm:hidden">Goals</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="px-2 pb-2">
          <TabsContent value="expenses" className="mt-0 p-4">
            <div className="animate-fade-in-up">
              <ModernExpenseChart 
                transactions={transactions}
                currency={currency}
              />
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="mt-0 p-4">
            <div className="animate-fade-in-up">
              <ModernRecentTransactions 
                transactions={transactions}
                onDeleteTransaction={onDeleteTransaction}
                currency={currency}
              />
            </div>
          </TabsContent>

          <TabsContent value="goals" className="mt-0 p-4">
            <div className="animate-fade-in-up">
              <ModernFinancialGoals 
                goals={goals}
                onAddGoal={onAddGoal}
                onUpdateGoal={onUpdateGoal}
                onDeleteGoal={onDeleteGoal}
                currency={currency}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default FinancialTabs;