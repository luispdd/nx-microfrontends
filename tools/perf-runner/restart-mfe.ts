import { spawn, execSync, ChildProcess } from 'child_process';
import * as http from 'http';

const args = process.argv.slice(2);
const projectArg = args.find(arg => arg.startsWith('--project='));
const isAll = args.includes('--all');

if (!projectArg && !isAll) {
  console.error('Please provide --project=<name> or --all flag');
  process.exit(1);
}

const projects = isAll ? ['mfe-material', 'mfe-primeng', 'mfe-native', 'shell'] : [projectArg.split('=')[1]];

const env = { ...process.env, PATH: `/home/fuchik0ma/.bun/bin:/home/fuchik0ma/.nvm/versions/node/v24.18.0/bin:${process.env.PATH}` };

const portMapping: Record<string, number> = {
  'shell': 4200,
  'mfe-material': 4201,
  'mfe-primeng': 4202,
  'mfe-native': 4203
};

async function checkHealth(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    http.get(`http://localhost:${port}`, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function waitForReady(port: number, timeout = 30000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await checkHealth(port)) {
      return;
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error(`Timeout waiting for port ${port}`);
}

async function restartMfe(project: string) {
  const port = portMapping[project];
  if (!port) {
    console.error(`Unknown project: ${project}`);
    return;
  }

  console.log(`Killing process on port ${port}...`);
  try {
    execSync(`fuser -k ${port}/tcp`, { env });
  } catch (e) {
    // Port might not be in use
  }

  console.log(`Building ${project}...`);
  execSync(`bunx nx build ${project}`, { env, stdio: 'inherit' });

  console.log(`Serving ${project}...`);
  const serveProcess = spawn('bunx', ['nx', 'serve', project], { env, stdio: 'inherit', detached: true });
  serveProcess.unref();

  console.log(`Waiting for ${project} to be ready on port ${port}...`);
  try {
    await waitForReady(port);
    console.log(`${project} is ready!`);
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  for (const project of projects) {
    await restartMfe(project);
  }
}

main().catch(console.error);
