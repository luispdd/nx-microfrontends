#!/bin/bash
set -e
export PATH="/home/fuchik0ma/.bun/bin:/home/fuchik0ma/.nvm/versions/node/v24.18.0/bin:$PATH"

echo "Building MFEs for production..."
bunx nx run-many -t build -p shell mfe-material mfe-primeng mfe-native --configuration=production

echo "Generating comparative bundle size report..."
bun tools/perf-runner/bundle-report.ts
