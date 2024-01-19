import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://bkcpkgwemxwrkaewlfff.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrY3BrZ3dlbXh3cmthZXdsZmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxNzA5MTksImV4cCI6MjAyMDc0NjkxOX0.wRt8i0jsg-SWr-oKPQLNd7X_cSqprFocYCyguD8ulXE"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase