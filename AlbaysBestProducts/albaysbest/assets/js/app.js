const supabaseUrl = 'https://cbawajixkuwgcoweodru.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiYXdhaml4a3V3Z2Nvd2VvZHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzOTUxNzMsImV4cCI6MjA0Njk3MTE3M30.pf7Qhh5mr5R-tCu3q2SeR1rqxl75XgZK1QHVSGPaQrg';

// Assuming you have a Supabase client library imported (e.g., @supabase/supabase-js)
const { createClient } = require('@supabase/supabase-js'); 
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchData() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
      return; 
    }

    const list = document.getElementById('user-list');
    list.innerHTML = ''; 

    data.forEach((user) => {
      const item = document.createElement('li');
      item.textContent = `${user.name} (${user.email})`; 
      list.appendChild(item);
    });

  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}

// Call the fetchData function to get data
fetchData();