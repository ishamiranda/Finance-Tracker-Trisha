import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import { Sparkles } from 'lucide-react'; // Importing an icon for the title

const Login = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && session) {
      navigate('/');
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-4">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 animate-scale-in">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Sparkles className="h-7 w-7 text-purple-600 dark:text-purple-400 animate-pulse" />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Welcome Back!
          </span>
          <Sparkles className="h-7 w-7 text-pink-600 dark:text-pink-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </h2>
        <Auth
          supabaseClient={supabase}
          providers={[]} // You can add 'google', 'github', etc. here if desired
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(270 60% 50%)', // A purple shade
                  brandAccent: 'hsl(330 60% 50%)', // A pink shade
                  inputBackground: 'hsl(var(--background))',
                  inputBorder: 'hsl(var(--border))',
                  inputBorderHover: 'hsl(var(--ring))',
                  inputBorderFocus: 'hsl(var(--ring))',
                  inputText: 'hsl(var(--foreground))',
                  // Customizing button styles
                  buttonBackground: 'hsl(270 60% 50%)', // Purple
                  buttonBackgroundHover: 'hsl(270 60% 40%)', // Darker purple
                  buttonBorder: 'hsl(270 60% 50%)',
                  buttonText: 'hsl(0 0% 100%)', // White
                  // Customizing anchor (link) styles
                  anchorText: 'hsl(330 60% 50%)', // Pink
                  anchorTextHover: 'hsl(330 60% 40%)', // Darker pink
                },
              },
            },
          }}
          theme="light" // Default to light theme, can be dynamic based on app theme
          redirectTo={window.location.origin + '/'}
        />
      </div>
    </div>
  );
};

export default Login;