import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

const supabaseUrl = 'https://tbomtxkvnvsxvaxnnmla.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRib210eGt2bnZzeHZheG5ubWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMTM0NzUsImV4cCI6MjA5NjU4OTQ3NX0.yMv3Y9eGERgUqRTCSjUoM0cZh0ILzGHXcDgZH7IY-Lc';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: fetch.bind(globalThis) } // not needed for fetch, but ws is not here
});
// actually the error said: new RealtimeClient(url, { transport: ws })
// Supabase JS allows: createClient(url, key, { realtime: { params: { transport: ws } } })
