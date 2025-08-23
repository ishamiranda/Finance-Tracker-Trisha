import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Filter, Calendar, DollarSign, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Transaction } from "@/types/finance";
import { showSuccess } from "@/utils/toast";

interface ExportAndFilterSectionProps {
  transactions: Transaction[];
  currency: string;
}

const ExportAndFilterSection = ({ transactions, currency }: ExportAndFilterSectionProps) => {
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  // Month view state
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const formatCurrency = (value: number) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    } catch (error) {
      return `$${value.toFixed(2)}`;
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get available years from transactions
  const availableYears = [...new Set(transactions.map(t => new Date(t.date).getFullYear()))]
    .sort((a, b) => b - a);

  // Add current year if no transactions exist yet
  if (availableYears.length === 0) {
    availableYears.push(currentDate.getFullYear());
  }

  // Get selected month data
  const selectedMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === selectedMonth && transactionDate.getFullYear() === selectedYear;
  });

  const selectedMonthIncome = selectedMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const selectedMonthExpenses = selectedMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Navigation functions
  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const goToCurrentMonth = () => {
    setSelectedMonth(currentDate.getMonth());
    setSelectedYear(currentDate.getFullYear());
  };

  // Filter transactions based on current filters (for export)
  const getFilteredTransactions = () => {
    let filtered = transactions;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    // Filter by year
    if (filterYear !== 'all') {
      filtered = filtered.filter(t => new Date(t.date).getFullYear() === parseInt(filterYear));
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(endDate));
    }

    return filtered;
  };

  const exportToCSV = () => {
    const filteredTransactions = getFilteredTransactions();
    
    if (filteredTransactions.length === 0) {
      showSuccess('No transactions to export with current filters! 📊');
      return;
    }

    // CSV headers
    const headers = ['Date', 'Description', 'Amount', 'Type', 'Category'];
    
    // Convert transactions to CSV format
    const csvData = filteredTransactions.map(transaction => [
      transaction.date,
      `"${transaction.description}"`, // Wrap in quotes to handle commas
      transaction.amount,
      transaction.type,
      transaction.category
    ]);

    // Combine headers and data
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    // Generate filename with current date and filters
    const today = new Date().toISOString().split('T')[0];
    const filterSuffix = filterType !== 'all' ? `_${filterType}` : '';
    const yearSuffix = filterYear !== 'all' ? `_${filterYear}` : '';
    link.setAttribute('download', `financial_data_${today}${filterSuffix}${yearSuffix}.csv`);
    
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccess(`Exported ${filteredTransactions.length} transactions to CSV! 📁`);
  };

  const filteredCount = getFilteredTransactions().length;
  const isCurrentMonth = selectedMonth === currentDate.getMonth() && selectedYear === currentDate.getFullYear();

  return (
    <Card className="bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            📈 Financial Overview & Export
            <span className="text-2xl">✨</span>
          </CardTitle>
          
          {/* Simple Month Navigation */}
          <div className="flex items-center gap-3 bg-purple-50/80 rounded-2xl px-4 py-2">
            <Button
              onClick={goToPreviousMonth}
              variant="ghost"
              size="sm"
              className="text-purple-600 hover:bg-purple-100 rounded-full p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-lg">🗓️</span>
              <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
                {months[selectedMonth]} {selectedYear}
              </span>
            </div>
            
            <Button
              onClick={goToNextMonth}
              variant="ghost"
              size="sm"
              className="text-purple-600 hover:bg-purple-100 rounded-full p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {!isCurrentMonth && (
              <Button
                onClick={goToCurrentMonth}
                variant="ghost"
                size="sm"
                className="text-purple-600 hover:bg-purple-100 rounded-xl px-3 py-1 text-xs"
              >
                Today
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        {/* Selected Month Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💰</span>
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-green-800">Income</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{formatCurrency(selectedMonthIncome)}</p>
            <p className="text-xs text-green-700 mt-1">
              {selectedMonthTransactions.filter(t => t.type === 'income').length} transactions
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-2xl border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💸</span>
              <TrendingDown className="h-5 w-5 text-red-600" />
              <span className="text-sm font-semibold text-red-800">Expenses</span>
            </div>
            <p className="text-2xl font-bold text-red-900">{formatCurrency(selectedMonthExpenses)}</p>
            <p className="text-xs text-red-700 mt-1">
              {selectedMonthTransactions.filter(t => t.type === 'expense').length} transactions
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💎</span>
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Net Balance</span>
            </div>
            <p className={`text-2xl font-bold ${selectedMonthIncome - selectedMonthExpenses >= 0 ? 'text-green-900' : 'text-red-900'}`}>
              {formatCurrency(selectedMonthIncome - selectedMonthExpenses)}
            </p>
            <p className="text-xs text-blue-700 mt-1">
              {selectedMonthTransactions.length} total transactions
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔍</span>
            <Filter className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Export Filters</h3>
            <span className="text-xl">🎯</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <span className="text-lg">📊</span>
                Transaction Type
              </Label>
              <Select value={filterType} onValueChange={(value: 'all' | 'income' | 'expense') => setFilterType(value)}>
                <SelectTrigger className="border-gray-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-0 rounded-2xl shadow-xl">
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="income">Income Only</SelectItem>
                  <SelectItem value="expense">Expenses Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <span className="text-lg">📅</span>
                Year
              </Label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="border-gray-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-0 rounded-2xl shadow-xl">
                  <SelectItem value="all">All Years</SelectItem>
                  {availableYears.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <span className="text-lg">🌅</span>
                Start Date
              </Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-gray-200 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <span className="text-lg">🌇</span>
                End Date
              </Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-gray-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-purple-50/80 p-4 rounded-2xl border border-purple-200">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-purple-900 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              {filteredCount} transactions match your filters
              <span className="text-xl">✨</span>
            </p>
            <p className="text-sm text-purple-700 flex items-center gap-1">
              <span className="text-lg">📁</span>
              Export your financial data to CSV format for analysis
            </p>
          </div>
          
          <Button
            onClick={exportToCSV}
            disabled={filteredCount === 0}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="text-xl">🚀</span>
            <Download className="h-5 w-5" />
            Export to CSV
            <span className="text-xl">📊</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportAndFilterSection;