import test from 'node:test';
import assert from 'node:assert/strict';
import { PipelineStateMachine } from '../engine/state_machine.js';
import { PipelinePhase, AgentRole } from '../agents/types.js';
import { EvaluatorOptimizerLoop } from '../engine/evaluator_loop.js';

test('PipelineStateMachine: transition nominale INTAKE -> SPECIFICATION -> ARCHITECTURE', () => {
  const sm = new PipelineStateMachine('test-project');
  assert.equal(sm.getState().currentPhase, PipelinePhase.INTAKE);
  assert.equal(sm.getState().currentAgent, AgentRole.ORCHESTRATOR);

  sm.transitionTo(PipelinePhase.SPECIFICATION, AgentRole.PRODUCT_OWNER, 'Specs initiées');
  assert.equal(sm.getState().currentPhase, PipelinePhase.SPECIFICATION);
  assert.equal(sm.getState().currentAgent, AgentRole.PRODUCT_OWNER);

  sm.transitionTo(PipelinePhase.ARCHITECTURE, AgentRole.SYSTEM_ARCHITECT, 'Architecture en cours');
  assert.equal(sm.getState().currentPhase, PipelinePhase.ARCHITECTURE);
});

test('PipelineStateMachine: empêche une transition illégale directe de INTAKE vers REVIEW_AUDIT', () => {
  const sm = new PipelineStateMachine('test-illegal');
  assert.throws(() => {
    sm.transitionTo(PipelinePhase.REVIEW_AUDIT, AgentRole.CODE_REVIEWER);
  }, /Transition invalide/);
});

test('EvaluatorOptimizerLoop: rejette si une vulnérabilité critique est présente', () => {
  const loop = new EvaluatorOptimizerLoop(3);
  const feedback = loop.evaluate({
    status: 'APPROVED',
    iteration: 1,
    issues: [
      {
        file: 'src/auth.ts',
        line: 42,
        severity: 'CRITICAL',
        category: 'SECURITY',
        message: 'Injection SQL détectée',
        remediation: 'Utiliser une requête préparée avec Prisma',
      },
    ],
    summary: 'Problème de sécurité majeur',
  });

  assert.equal(feedback.status, 'REJECTED');
  assert.equal(feedback.issues.length, 1);
  const formatted = loop.formatRemediationPlan(feedback);
  assert.match(formatted, /Injection SQL/);
  assert.match(formatted, /REJETÉ/);
});

test('EvaluatorOptimizerLoop: approuve si aucune issue critique ou haute', () => {
  const loop = new EvaluatorOptimizerLoop(3);
  const feedback = loop.evaluate({
    status: 'APPROVED',
    iteration: 1,
    issues: [],
    summary: 'Code conforme',
  });

  assert.equal(feedback.status, 'APPROVED');
  const formatted = loop.formatRemediationPlan(feedback);
  assert.match(formatted, /SUCCÈS/);
});
