import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, Heart } from "lucide-react";

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

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    setCompliment(compliments[randomIndex]);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="fixed top-6 right-6 z-50 h-14 w-14 rounded-full bg-pink-100/90 dark:bg-pink-900/80 text-pink-600 dark:text-pink-300 hover:bg-pink-200/90 dark:hover:bg-pink-800/90 hover:scale-110 transition-transform duration-200 animate-gentle-float shadow-lg"
          aria-label="Open compliment gift"
        >
          <Gift className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl max-w-sm mx-auto text-center p-8">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-red-500 animate-subtle-pulse" />
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            A Little Something for You
          </DialogTitle>
        </DialogHeader>
        <p className="text-lg text-gray-700 mt-4">{compliment}</p>
      </DialogContent>
    </Dialog>
  );
};

export default ComplimentGift;