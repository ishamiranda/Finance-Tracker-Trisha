import { supabase } from './client';
import { AuthApiError } from '@supabase/supabase-js';

export const handleAuthError = (error: AuthApiError | Error) => {
  if (error instanceof AuthApiError) {
    // Handle Supabase specific auth errors
    console.error('Supabase Auth Error:', error.message);
    // You might want to show a toast notification here
    // showError(error.message);
  } else {
    // Handle generic errors
    console.error('Authentication Error:', error.message);
    // showError('An unexpected error occurred during authentication.');
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    handleAuthError(error);
  }
};