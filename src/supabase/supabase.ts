import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vxbjqybxueympyxebcqs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4YmpxeWJ4dWV5bXB5eGViY3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1NzMxMTUsImV4cCI6MTk5NDE0OTExNX0.5uwwjOPL62Oq-1epq8m02sL2h-amwG4uf6Ga1xML1kE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
