import * as fs from 'node:fs';
import * as path from 'node:path';

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  files: Record<string, string>;
}

export const TEMPLATES: Record<string, ProjectTemplate> = {
  'fullstack-ts': {
    id: 'fullstack-ts',
    name: 'Fullstack TypeScript (Next.js / Express / Node)',
    description: 'Stack complète typée de bout en bout avec Vitest, validation Zod et Docker multi-stage.',
    techStack: ['TypeScript', 'Node.js', 'Next.js/React', 'Zod', 'Vitest', 'Docker'],
    files: {
      'package.json': JSON.stringify(
        {
          name: 'project-app',
          version: '0.1.0',
          private: true,
          type: 'module',
          scripts: {
            dev: 'node src/index.js',
            build: 'tsc',
            test: 'vitest run',
            'test:watch': 'vitest',
            lint: 'eslint .',
          },
          dependencies: {
            zod: '^3.23.8',
          },
          devDependencies: {
            typescript: '^5.5.4',
            vitest: '^2.0.5',
          },
        },
        null,
        2
      ),
      'tsconfig.json': JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            module: 'NodeNext',
            moduleResolution: 'NodeNext',
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
          },
        },
        null,
        2
      ),
      '.env.example': '# Configuration générale de l\'application\nPORT=3000\nNODE_ENV=development\nDATABASE_URL=postgresql://user:pass@localhost:5432/app_db\n',
      'Dockerfile': `# Multi-stage build optimisé
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
USER node
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
`,
      'docker-compose.yml': `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    env_file:
      - .env.example
`,
    },
  },

  'python-fastapi': {
    id: 'python-fastapi',
    name: 'Python FastAPI Microservice (Python 3.12+)',
    description: 'Microservice async avec Pydantic v2, Pytest pour TDD, SQLAlchemy 2.0 et conteneur Docker.',
    techStack: ['Python 3.12+', 'FastAPI', 'Pydantic v2', 'Pytest', 'Docker'],
    files: {
      'pyproject.toml': `[project]
name = "fastapi-service"
version = "0.1.0"
description = "Microservice haute performance propulsé par la Code Factory"
readme = "README.md"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.115.0",
    "uvicorn>=0.30.0",
    "pydantic>=2.8.0",
    "pydantic-settings>=2.4.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.3.0",
    "pytest-asyncio>=0.24.0",
    "httpx>=0.27.0",
    "ruff>=0.6.0",
]
`,
      '.env.example': 'APP_ENV=development\nPORT=8000\nSECRET_KEY=change-me-in-production-use-a-strong-random-key\n',
      'Dockerfile': `FROM python:3.12-slim AS runner
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
RUN useradd -m -u 1001 appuser
COPY pyproject.toml ./
RUN pip install --no-cache-dir .
COPY . .
USER appuser
EXPOSE 8000
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
`,
      'docker-compose.yml': `version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file:
      - .env.example
`,
    },
  },

  'cli-tool': {
    id: 'cli-tool',
    name: 'CLI Tool (Node.js & TypeScript)',
    description: 'Scaffold pour outil en ligne de commande avec Commander, tests unitaires et distribution binaire.',
    techStack: ['TypeScript', 'Commander', 'Vitest'],
    files: {
      'package.json': JSON.stringify(
        {
          name: 'my-cli-tool',
          version: '0.1.0',
          type: 'module',
          bin: {
            'my-cli': 'dist/index.js',
          },
          scripts: {
            build: 'tsc',
            test: 'vitest run',
          },
          dependencies: {
            commander: '^12.1.0',
          },
          devDependencies: {
            typescript: '^5.5.4',
            vitest: '^2.0.5',
          },
        },
        null,
        2
      ),
      'tsconfig.json': JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            module: 'NodeNext',
            moduleResolution: 'NodeNext',
            strict: true,
          },
        },
        null,
        2
      ),
    },
  },
};

export function scaffoldTemplate(templateId: string, targetDir: string): void {
  const template = TEMPLATES[templateId];
  if (!template) {
    throw new Error(`Template inconnu : ${templateId}. Disponibles : ${Object.keys(TEMPLATES).join(', ')}`);
  }

  for (const [relativePath, content] of Object.entries(template.files)) {
    const fullPath = path.join(targetDir, relativePath);
    const parent = path.dirname(fullPath);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.writeFileSync(fullPath, content, 'utf-8');
  }
}
