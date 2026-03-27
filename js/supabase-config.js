/**
 * Supabase Configuration for WAIZE AUTOS
 * Automatically injects the Supabase client so it can be accessed globally
 */

const supabaseUrl = 'https://eczbkajirlgusmabbwzl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjemJrYWppcmxndXNtYWJid3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NTU3MDYsImV4cCI6MjA5MDEzMTcwNn0._IFBj1krwrntJ6Y2IAWdKHU-LcFLHmlcVJHZvE_OHx0';

// Initialize the Supabase client directly to the window object to avoid naming conflicts
window.supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log('✅ Supabase Client Initialized Successfully');
