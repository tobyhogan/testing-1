import { readFileSync } from 'fs';

// Read the control file
const shouldDeploy = readFileSync('z-should-deploy.txt', 'utf8').trim();

if (shouldDeploy === 'true') {
  console.log('✅ Proceeding with deployment');
  process.exit(1); // Exit 1 = proceed with build
} else {
  console.log('⏭️  Skipping deployment');
  process.exit(0); // Exit 0 = cancel build
}