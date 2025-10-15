import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://clpagxnjquwtdgzzdglg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscGFneG5qcXV3dGRnenpkZ2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3MTA4NjMsImV4cCI6MjA3NTI4Njg2M30.YCTLficaAnpKw7OPzxfCRVrr_6SGs7Y0_z8x_cbA5Ms';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);