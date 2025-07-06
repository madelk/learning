// Test file to trigger CI workflow without deployment
// This file tests the improved npm ci configuration with:
// - 10-minute timeout
// - --no-audit, --no-fund, --prefer-offline flags
// - Reduced npm verbosity
// - Environment debugging info

export const testMessage =
  "Testing CI improvements - no deployment should trigger";
