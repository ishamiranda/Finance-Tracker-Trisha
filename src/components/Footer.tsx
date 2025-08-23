const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 All rights reserved. Created by{" "}
            <a
              href="https://jalandonimarky.github.io/automation-wizard-portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold hover:underline transition-colors duration-200"
            >
              Mark Jalandoni
            </a>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Personal Finance Dashboard - Manage your finances with style
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;