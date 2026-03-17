// Builds the extension before the E2E test suite runs.
//
// The built dist/ directory is what Chrome loads as the extension.
// Uses stdio: 'inherit' so build errors are visible in test output
// and cause the test run to fail immediately.
import { execSync } from 'child_process';

export default function globalSetup() {
  execSync('npm run build', { stdio: 'inherit' });
}
