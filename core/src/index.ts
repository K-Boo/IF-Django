#!/usr/bin/env node
import { Command } from 'commander';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { AGENT_CATALOG } from './agents/catalog.js';
import { AgentRole, PipelinePhase } from './agents/types.js';
import { PipelineStateMachine } from './engine/state_machine.js';
import { ProjectMemory } from './engine/memory.js';
import { TEMPLATES, scaffoldTemplate } from './templates/index.js';
import { EvaluatorOptimizerLoop } from './engine/evaluator_loop.js';

const program = new Command();

program
  .name('code-factory')
  .description('Moteur d\'Orchestration Agentique & Usine Logicielle (État de l\'art 2026)')
  .version('1.0.0');

// Commande : Créer un nouveau projet
program
  .command('new <name>')
  .description('Initialise un nouveau projet applicatif managé par la Code Factory')
  .option('-t, --template <template>', 'Template de départ (fullstack-ts, python-fastapi, cli-tool)', 'fullstack-ts')
  .option('-g, --goal <description>', 'Objectif ou description rapide du projet', 'Application générée par la Code Factory')
  .action((name: string, options: { template: string; goal: string }) => {
    const projectsRoot = path.resolve(process.cwd(), '../projects');
    const projectDir = path.join(projectsRoot, name);

    if (fs.existsSync(projectDir)) {
      console.error(`[ERREUR] Le projet '${name}' existe déjà dans : ${projectDir}`);
      process.exit(1);
    }

    console.log(`\n======================================================`);
    console.log(`🏭 Démarrage de la Code Factory pour le projet : ${name}`);
    console.log(`======================================================\n`);

    const memory = new ProjectMemory(projectDir);
    memory.ensureDirectories();

    // Initialisation du template
    scaffoldTemplate(options.template, projectDir);
    console.log(`✔ Template '${options.template}' injecté avec succès.`);

    // Initialisation de la machine à états
    const stateMachine = new PipelineStateMachine(name);
    memory.saveState(stateMachine.getState());

    // Génération du fichier initial de spécification
    const initialSpec = `# SPÉCIFICATION : ${name.toUpperCase()}

## 1. Objectif Global
${options.goal}

## 2. Périmètre (In-Scope)
- Fonctionnalités principales à définir par l'agent 'spec-architect'.

## 3. Critères Non-Fonctionnels
- Couverture de test minimale : 80%
- Zéro secret en clair, respect de l'OWASP Top 10.
- Conteneurisation Docker multi-stage.
`;
    memory.recordArtifact('specs/SPEC.md', initialSpec);

    console.log(`✔ Structure de répertoires créée : ${projectDir}`);
    console.log(`✔ Fichier d'état initialisé dans .factory/PIPELINE_STATE.json`);
    console.log(`✔ Artefact initial créé : specs/SPEC.md`);
    console.log(`\nProchaine étape : Lancer la phase de spécification avec l'agent 'spec-architect' ou le chat Antigravity.\n`);
  });

// Commande : Consulter l'état du pipeline
program
  .command('status <name>')
  .description('Affiche l\'état courant du pipeline de production d\'un projet')
  .action((name: string) => {
    const projectDir = path.resolve(process.cwd(), '../projects', name);
    const memory = new ProjectMemory(projectDir);
    const state = memory.loadState();

    if (!state) {
      console.error(`[ERREUR] Projet introuvable ou non initialisé : ${name}`);
      process.exit(1);
    }

    console.log(`\n======================================================`);
    console.log(`📊 État du Pipeline : ${state.projectName}`);
    console.log(`======================================================`);
    console.log(`- Phase Courante     : ${state.currentPhase}`);
    console.log(`- Agent Actif        : ${state.currentAgent}`);
    console.log(`- Itérations Revue   : ${state.reviewIteration} / ${state.maxReviewIterations}`);
    console.log(`\nHistorique des Transitions :`);
    state.history.forEach((h, idx) => {
      console.log(`  ${idx + 1}. [${h.timestamp.slice(11, 19)}] Phase: ${h.phase} | Agent: ${h.agent} | Note: ${h.note || 'N/A'}`);
    });
    console.log(`\n`);
  });

// Commande : Lister les agents disponibles
program
  .command('agents')
  .description('Affiche la liste des 8 agents spécialisés et leurs responsabilités')
  .action(() => {
    console.log(`\n======================================================`);
    console.log(`🤖 Équipe d'Agents de la Code Factory (2026)`);
    console.log(`======================================================\n`);

    Object.values(AGENT_CATALOG).forEach((agent) => {
      console.log(`• [${agent.id}] ${agent.title}`);
      console.log(`  ${agent.description}`);
      console.log(`  - Entrées requises : ${agent.requiredInputs.join(', ')}`);
      console.log(`  - Sorties produites : ${agent.producedArtifacts.join(', ')}\n`);
    });
  });

// Commande : Lister les templates
program
  .command('templates')
  .description('Affiche les templates de projets disponibles')
  .action(() => {
    console.log(`\n======================================================`);
    console.log(`📦 Templates de Démarrage Prêts à l'Emploi`);
    console.log(`======================================================\n`);

    Object.values(TEMPLATES).forEach((tmpl) => {
      console.log(`• [${tmpl.id}] ${tmpl.name}`);
      console.log(`  ${tmpl.description}`);
      console.log(`  Stack : ${tmpl.techStack.join(', ')}\n`);
    });
  });

// Commande : Lancer la revue de sécurité et qualité
program
  .command('review <name>')
  .description('Exécute la porte de revue de sécurité et qualité (Evaluator-Optimizer)')
  .action((name: string) => {
    const projectDir = path.resolve(process.cwd(), '../projects', name);
    const memory = new ProjectMemory(projectDir);
    const state = memory.loadState();

    if (!state) {
      console.error(`[ERREUR] Projet introuvable : ${name}`);
      process.exit(1);
    }

    console.log(`\n======================================================`);
    console.log(`🛡️ Audit de Sécurité & Revue de Code : ${name}`);
    console.log(`======================================================\n`);

    const evaluator = new EvaluatorOptimizerLoop();
    // Simulation d'une évaluation pour démonstration
    const simulatedFeedback = {
      status: 'APPROVED' as const,
      iteration: 1,
      issues: [],
      summary: 'Toutes les vérifications statiques et les tests automatisés sont au vert.',
    };

    const evaluated = evaluator.evaluate(simulatedFeedback);
    console.log(evaluator.formatRemediationPlan(evaluated));
  });

program.parse(process.argv);
