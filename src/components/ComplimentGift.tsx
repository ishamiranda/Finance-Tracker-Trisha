import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Sparkles, X } from "lucide-react";

const compliments = [
  "You are looking gorgeous today!",
  "Is it just me or are you shining brighter than usual?",
  "Your smile is my favorite thing to see.",
  "Just a reminder that you are incredibly special.",
  "You have the most beautiful soul.",
  "You make my world a better place just by being in it.",
  "Your kindness and strength inspire me.",
  "Did you do something different today? You look even more amazing.",
];

const ComplimentGift = () => {
  const [compliment, setCompliment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    setCompliment(compliments[randomIndex]);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  // Close popup when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popup = document.getElementById('compliment-popup');
      if (popup && !popup.contains(event.target as Node)) {
        closePopup();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <Button
        onClick={openPopup}
        variant="ghost"
        className="h-12 w-12 rounded-2xl bg-pink-100/90 dark:bg-pink-900/80 text-pink-600 dark:text-pink-300 hover:bg-pink-200/90 dark:hover:bg-pink-800/90 hover:scale-110 transition-all duration-200 animate-gentle-float shadow-lg border border-pink-200/50 dark:border-pink-700/50"
        aria-label="Open compliment gift"
      >
        <Gift className="h-5 w-5" />
      </Button>

      {/* Custom Popup Overlay - Middle Centered */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
        >
          <div
            id="compliment-popup"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 shadow-2xl rounded-3xl w-full max-w-sm overflow-hidden animate-scale-in border-2 border-white/80 dark:border-gray-700/80"
            style={{ 
              zIndex: 10000,
            }}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900"></div>

            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 z-50 p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg border border-gray-200 dark:border-gray-600"
              style={{ zIndex: 10001 }}
            >
              <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Glitter/Sparkle Effects */}
            <div className="absolute inset-0 pointer-events-none z-40">
              <div className="absolute top-4 left-4 text-yellow-500 animate-ping">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="absolute top-8 right-8 text-pink-500 animate-pulse" style={{ animationDelay: '0.5s' }}>
                <Sparkles className="h-3 w-3" />
              </div>
              <div className="absolute bottom-8 left-8 text-purple-500 animate-bounce" style={{ animationDelay: '1s' }}>
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="absolute bottom-4 right-4 text-blue-500 animate-ping" style={{ animationDelay: '1.5s' }}>
                <Sparkles className="h-3 w-3" />
              </div>
              <div className="absolute top-1/2 left-2 text-yellow-400 animate-pulse" style={{ animationDelay: '2s' }}>
                <Sparkles className="h-3 w-3" />
              </div>
              <div className="absolute top-1/3 right-2 text-pink-400 animate-bounce" style={{ animationDelay: '2.5s' }}>
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            {/* Main Content */}
            <div className="relative z-40 p-8 text-center">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <Heart className="h-16 w-16 text-red-500 animate-subtle-pulse drop-shadow-lg" />
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="h-6 w-6 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  A Little Something for You
                </h2>
              </div>
              
              <div className="mt-8 p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-inner border-2 border-white/80 dark:border-gray-700/80">
                <p className="text-xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                  {compliment}
                </p>
              </div>

              <div className="mt-6 flex justify-center space-x-2">
                <span className="text-2xl animate-bounce">💖</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🌟</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>💫</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.8s' }}>💖</span>
              </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
              <div className="absolute w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-80" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
              <div className="absolute w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-80" style={{ top: '60%', left: '80%', animationDelay: '1s' }}></div>
              <div className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-80" style={{ top: '80%', left: '20%', animationDelay: '2s' }}></div>
              <div className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-80" style={{ top: '30%', left: '90%', animationDelay: '3s' }}></div>
              <div className="absolute w-3 h-3 bg-pink-300 rounded-full animate-ping opacity-80" style={{ top: '70%', left: '5%', animationDelay: '4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComplimentGift;