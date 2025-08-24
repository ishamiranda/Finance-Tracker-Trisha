import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://omqbnzhgtpldgyynxsbv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tcWJuemhndHBsZGd5eW54c2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTEzNjgsImV4cCI6MjA3MTYyNzM2OH0.DOHtGFrzqMg3OLSXM735WbYJq0NINo-od66EYi8o6XU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);