import dockerCompose from 'docker-compose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

export async function startContainer() {
  try {
    await dockerCompose.upAll({
      cwd: rootDir,
      log: true,
      commandOptions: ['--build']
    });
    console.log('Container started successfully');
  } catch (err) {
    console.error('Error starting container:', err);
    throw err;
  }
}

export async function stopContainer() {
  try {
    await dockerCompose.down({ cwd: rootDir });
    console.log('Container stopped successfully');
  } catch (err) {
    console.error('Error stopping container:', err);
    throw err;
  }
}

if (process.argv[2] === 'up') {
  startContainer();
} else if (process.argv[2] === 'down') {
  stopContainer();
}
