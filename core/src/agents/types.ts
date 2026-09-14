import { z } from 'zod';

export enum AgentRole {
  ORCHESTRATOR = 'factory-orchestrator',
  PRODUCT_OWNER = 'spec-architect',
  SYSTEM_ARCHITECT = 'tech-architect',
  QA_TDD = 'tdd-lead',
  BACKEND_DEV = 'backend-dev',
  FRONTEND_DEV = 'frontend-dev',
  CODE_REVIEWER = 'code-reviewer',
  DEVOPS = 'devops-deployer',
}

export enum PipelinePhase {
  INTAKE = 'INTAKE',
  SPECIFICATION = 'SPECIFICATION',
  ARCHITECTURE = 'ARCHITECTURE',
  TDD_RED = 'TDD_RED',
  DEV_GREEN = 'DEV_GREEN',
  REFACTOR = 'REFACTOR',
  REVIEW_AUDIT = 'REVIEW_AUDIT',
  DEVOPS_PACKAGING = 'DEVOPS_PACKAGING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export const AgentDefinitionSchema = z.object({
  id: z.nativeEnum(AgentRole),
  title: z.string(),
  description: z.string(),
  systemPrompt: z.string(),
  requiredInputs: z.array(z.string()),
  producedArtifacts: z.array(z.string()),
  allowedTransitions: z.array(z.nativeEnum(PipelinePhase)),
});

export type AgentDefinition = z.infer<typeof AgentDefinitionSchema>;

export const ReviewFeedbackSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  iteration: z.number().int().min(1),
  issues: z.array(
    z.object({
      file: z.string(),
      line: z.number().optional(),
      severity: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
      category: z.enum(['SECURITY', 'QUALITY', 'PERFORMANCE', 'TEST_COVERAGE', 'STYLE']),
      message: z.string(),
      remediation: z.string(),
    })
  ),
  summary: z.string(),
});

export type ReviewFeedback = z.infer<typeof ReviewFeedbackSchema>;
