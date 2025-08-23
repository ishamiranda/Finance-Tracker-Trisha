import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      className={`flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-200 ${className}`}
    >
      <div className="relative">
        {isDark ? (
          <Sun className="h-4 w-4 text-yellow-500 animate-spin-slow" />
        ) : (
          <Moon className="h-4 w-4 text-purple-600" />
        )}
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {isDark ? '☀️' : '🌙'}
      </span>
    </Button>
  );
};

export default ThemeToggle;