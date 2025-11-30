import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qcmlftwkovmajwtljauv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjbWxmdHdrb3ZtYWp3dGxqYXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjQ0MzgsImV4cCI6MjA3NjIwMDQzOH0.pQUnYLfGgvTAQFXr5Y-d8-jsFHFNt3Eoknz1d3P6qQw';

// Configuração do AsyncStorage para persistir a sessão de login no React Native
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Essencial para o React Native/Expo
  },
});

export default supabase;