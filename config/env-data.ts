import dotenv from 'dotenv';

if (process.env.CI !== 'true') {
  dotenv.config({ path: 'env/prod.env' });
  console.log('Running in local environment');
} else {
  console.log('Running in CI environment');
}

const requiredVars = ['URL', 'USER_NAME', 'PASSWORD'];

// Check for missing variables
requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

export const SERVICE_URL: string = process.env.URL!;
export const USERNAME: string = process.env.USER_NAME!;
export const PASSWORD: string = process.env.PASSWORD!;
