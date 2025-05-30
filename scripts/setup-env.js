const fs = require('fs');
const path = require('path');

// Environment Configuration
const envVars = {
  // Database
  DATABASE_URL: 'postgresql://postgres:Xi2W%26%3F6K5U%21u.%40m@xvoypjkpindgvyowyvwc.supabase.co:5432/postgres',
  
  // App Configuration
  NEXT_PUBLIC_APP_URL: 'https://courageous-marigold-a5dbf3.netlify.app',
  NEXT_PUBLIC_BASE_URL: 'https://courageous-marigold-a5dbf3.netlify.app',
  RESEND_API_KEY: 're_123456789',
  NEXTAUTH_SECRET: 'your-nextauth-secret-key-here',
  NEXTAUTH_URL: 'https://courageous-marigold-a5dbf3.netlify.app'
};

// Create .env file
const envContent = Object.entries(envVars)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFileSync(path.join(__dirname, '../.env'), envContent);

// Create .env.example file (without sensitive values)
const exampleEnvContent = Object.entries(envVars)
  .map(([key]) => `${key}=`)
  .join('\n');

fs.writeFileSync(path.join(__dirname, '../.env.example'), exampleEnvContent);

console.log('Environment files created successfully!');
console.log('\nPlease add these environment variables to your Netlify dashboard:');
Object.entries(envVars).forEach(([key, value]) => {
  console.log(`${key}=${value}`);
}); 