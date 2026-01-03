/**
 * Environment Variable Validation
 * Ensures all required environment variables are set before the app starts
 */

interface EnvConfig {
  required: string[];
  optional: string[];
  warnings: string[];
}

const envConfig: EnvConfig = {
  required: [
    'POSTGRES_URL', // Database connection string
  ],
  optional: [
    'ADMIN_USERNAME', // Admin login username (defaults to 'admin')
    'ADMIN_PASSWORD', // Admin login password (defaults to 'admin123')
    'SESSION_SECRET', // Session encryption secret
    'RESEND_API_KEY', // Email service API key
    'CONTACT_EMAIL', // Email to receive contact form submissions
  ],
  warnings: [
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD',
    'SESSION_SECRET',
  ],
};

export function validateEnvironment(): {
  isValid: boolean;
  missing: string[];
  warnings: string[];
} {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  for (const varName of envConfig.required) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  // Check optional variables that should be set in production
  if (process.env.NODE_ENV === 'production') {
    for (const varName of envConfig.warnings) {
      if (!process.env[varName]) {
        warnings.push(varName);
      }
    }
  }

  return {
    isValid: missing.length === 0,
    missing,
    warnings,
  };
}

export function printEnvironmentStatus(): void {
  const result = validateEnvironment();

  console.log('\n========================================');
  console.log('Environment Configuration Status');
  console.log('========================================\n');

  if (result.isValid) {
    console.log('✅ All required environment variables are set\n');
  } else {
    console.error('❌ Missing required environment variables:\n');
    for (const varName of result.missing) {
      console.error(`   - ${varName}`);
    }
    console.log('\n');
  }

  if (result.warnings.length > 0) {
    console.warn('⚠️  Production warnings (using defaults):\n');
    for (const varName of result.warnings) {
      console.warn(`   - ${varName} is not set`);
    }
    console.log('\n');
  }

  // Show configured optional variables
  const configured = envConfig.optional.filter(v => process.env[v]);
  if (configured.length > 0) {
    console.log('✅ Optional variables configured:\n');
    for (const varName of configured) {
      console.log(`   - ${varName}`);
    }
    console.log('\n');
  }

  console.log('========================================\n');

  if (!result.isValid) {
    console.error('Please set the missing environment variables in your .env file or hosting platform.\n');
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing required environment variables');
    }
  }
}

// Run validation on import
if (process.env.NODE_ENV !== 'test') {
  printEnvironmentStatus();
}
