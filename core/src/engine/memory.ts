import * as fs from 'node:fs';
import * as path from 'node:path';
import { PipelineState } from './state_machine.js';

export class ProjectMemory {
  private projectRoot: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

  public getRootPath(): string {
    return this.projectRoot;
  }

  public ensureDirectories(): void {
    const dirs = [
      '',
      'specs',
      'docs',
      'docs/adr',
      'contracts',
      'tests',
      'tests/unit',
      'tests/integration',
      'tests/e2e',
      'backend',
      'backend/src',
      'frontend',
      'frontend/src',
      '.factory',
    ];

    for (const dir of dirs) {
      const fullPath = path.join(this.projectRoot, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    }
  }

  public saveState(state: PipelineState): void {
    const stateFile = path.join(this.projectRoot, '.factory', 'PIPELINE_STATE.json');
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf-8');
  }

  public loadState(): PipelineState | null {
    const stateFile = path.join(this.projectRoot, '.factory', 'PIPELINE_STATE.json');
    if (!fs.existsSync(stateFile)) {
      return null;
    }
    const raw = fs.readFileSync(stateFile, 'utf-8');
    return JSON.parse(raw) as PipelineState;
  }

  public recordArtifact(relativePath: string, content: string): void {
    const fullPath = path.join(this.projectRoot, relativePath);
    const parent = path.dirname(fullPath);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.writeFileSync(fullPath, content, 'utf-8');
  }

  public readArtifact(relativePath: string): string | null {
    const fullPath = path.join(this.projectRoot, relativePath);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    return fs.readFileSync(fullPath, 'utf-8');
  }
}
