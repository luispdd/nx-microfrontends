import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

interface BundleStat {
  app: string;
  jsRawBytes: number;
  jsGzipBytes: number;
  cssRawBytes: number;
  cssGzipBytes: number;
  totalRawBytes: number;
  totalGzipBytes: number;
  chunkCount: number;
}

const apps = ['shell', 'mfe-material', 'mfe-primeng', 'mfe-native'];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

function analyzeApp(appName: string): BundleStat {
  const browserDir = path.join(process.cwd(), 'dist', 'apps', appName, 'browser');
  if (!fs.existsSync(browserDir)) {
    return {
      app: appName,
      jsRawBytes: 0,
      jsGzipBytes: 0,
      cssRawBytes: 0,
      cssGzipBytes: 0,
      totalRawBytes: 0,
      totalGzipBytes: 0,
      chunkCount: 0,
    };
  }

  const files = fs.readdirSync(browserDir);
  let jsRaw = 0;
  let jsGzip = 0;
  let cssRaw = 0;
  let cssGzip = 0;
  let chunkCount = 0;

  for (const file of files) {
    const fullPath = path.join(browserDir, file);
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) continue;

    if (file.endsWith('.js')) {
      chunkCount++;
      const content = fs.readFileSync(fullPath);
      jsRaw += content.length;
      jsGzip += zlib.gzipSync(content).length;
    } else if (file.endsWith('.css')) {
      const content = fs.readFileSync(fullPath);
      cssRaw += content.length;
      cssGzip += zlib.gzipSync(content).length;
    }
  }

  return {
    app: appName,
    jsRawBytes: jsRaw,
    jsGzipBytes: jsGzip,
    cssRawBytes: cssRaw,
    cssGzipBytes: cssGzip,
    totalRawBytes: jsRaw + cssRaw,
    totalGzipBytes: jsGzip + cssGzip,
    chunkCount,
  };
}

const stats = apps.map(analyzeApp);

console.log('\n===============================================================');
console.log('       MICROFRONTEND BUNDLE SIZE BENCHMARK REPORT');
console.log('===============================================================\n');

console.table(
  stats.map((s) => ({
    Application: s.app,
    'JS (Raw)': formatBytes(s.jsRawBytes),
    'JS (Gzip)': formatBytes(s.jsGzipBytes),
    'CSS (Raw)': formatBytes(s.cssRawBytes),
    'CSS (Gzip)': formatBytes(s.cssGzipBytes),
    'Total (Raw)': formatBytes(s.totalRawBytes),
    'Total (Gzip)': formatBytes(s.totalGzipBytes),
    Chunks: s.chunkCount,
  }))
);

const outputDir = path.join(process.cwd(), 'dist', 'tools', 'perf-runner', 'bundle-analysis');
fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(path.join(outputDir, 'summary.json'), JSON.stringify(stats, null, 2));

const mdTable = [
  '# Microfrontends Bundle Size Benchmark Report',
  '',
  '| Application | JS (Raw) | JS (Gzip) | CSS (Raw) | CSS (Gzip) | Total (Raw) | Total (Gzip) | Chunks |',
  '| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |',
  ...stats.map(
    (s) =>
      `| **${s.app}** | ${formatBytes(s.jsRawBytes)} | ${formatBytes(s.jsGzipBytes)} | ${formatBytes(s.cssRawBytes)} | ${formatBytes(s.cssGzipBytes)} | **${formatBytes(s.totalRawBytes)}** | **${formatBytes(s.totalGzipBytes)}** | ${s.chunkCount} |`
  ),
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, 'summary.md'), mdTable);
console.log(`\nReport written to ${path.join(outputDir, 'summary.md')}\n`);
