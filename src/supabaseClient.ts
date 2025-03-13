import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://sb1-pv4kryhy.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiMS1wdjRrcnloeCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE2MjQ0MjYxLCJleHAiOjIwMzE4MjAyNjF9.a5796f86-939a-4e33-854e-b55b7ca28ae5'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
