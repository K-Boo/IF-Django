import { PipelinePhase, AgentRole } from '../agents/types.js';

export interface PipelineState {
  projectName: string;
  currentPhase: PipelinePhase;
  currentAgent: AgentRole;
  history: Array<{
    phase: PipelinePhase;
    agent: AgentRole;
    timestamp: string;
    note?: string;
  }>;
  reviewIteration: number;
  maxReviewIterations: number;
}

export class PipelineStateMachine {
  private state: PipelineState;

  constructor(projectName: string, maxReviewIterations = 3) {
    this.state = {
      projectName,
      currentPhase: PipelinePhase.INTAKE,
      currentAgent: AgentRole.ORCHESTRATOR,
      history: [
        {
          phase: PipelinePhase.INTAKE,
          agent: AgentRole.ORCHESTRATOR,
          timestamp: new Date().toISOString(),
          note: 'Pipeline initialisé',
        },
      ],
      reviewIteration: 0,
      maxReviewIterations,
    };
  }

  public getState(): PipelineState {
    return { ...this.state };
  }

  public canTransitionTo(nextPhase: PipelinePhase): boolean {
    const validTransitions: Record<PipelinePhase, PipelinePhase[]> = {
      [PipelinePhase.INTAKE]: [PipelinePhase.SPECIFICATION, PipelinePhase.FAILED],
      [PipelinePhase.SPECIFICATION]: [PipelinePhase.ARCHITECTURE, PipelinePhase.FAILED],
      [PipelinePhase.ARCHITECTURE]: [PipelinePhase.TDD_RED, PipelinePhase.FAILED],
      [PipelinePhase.TDD_RED]: [PipelinePhase.DEV_GREEN, PipelinePhase.FAILED],
      [PipelinePhase.DEV_GREEN]: [PipelinePhase.REFACTOR, PipelinePhase.REVIEW_AUDIT, PipelinePhase.FAILED],
      [PipelinePhase.REFACTOR]: [PipelinePhase.REVIEW_AUDIT, PipelinePhase.FAILED],
      [PipelinePhase.REVIEW_AUDIT]: [
        PipelinePhase.DEVOPS_PACKAGING, // Si approuvé
        PipelinePhase.DEV_GREEN,        // Si rejeté (boucle Evaluator-Optimizer)
        PipelinePhase.FAILED,           // Si nombre max d'itérations dépassé
      ],
      [PipelinePhase.DEVOPS_PACKAGING]: [PipelinePhase.COMPLETED, PipelinePhase.FAILED],
      [PipelinePhase.COMPLETED]: [],
      [PipelinePhase.FAILED]: [PipelinePhase.INTAKE], // Reprise possible
    };

    return validTransitions[this.state.currentPhase]?.includes(nextPhase) ?? false;
  }

  public transitionTo(nextPhase: PipelinePhase, nextAgent: AgentRole, note?: string): PipelineState {
    if (!this.canTransitionTo(nextPhase)) {
      throw new Error(
        `Transition invalide de ${this.state.currentPhase} vers ${nextPhase}`
      );
    }

    if (nextPhase === PipelinePhase.DEV_GREEN && this.state.currentPhase === PipelinePhase.REVIEW_AUDIT) {
      this.state.reviewIteration += 1;
      if (this.state.reviewIteration > this.state.maxReviewIterations) {
        this.state.currentPhase = PipelinePhase.FAILED;
        this.state.currentAgent = AgentRole.ORCHESTRATOR;
        this.state.history.push({
          phase: PipelinePhase.FAILED,
          agent: AgentRole.ORCHESTRATOR,
          timestamp: new Date().toISOString(),
          note: `Échec du pipeline : dépassement du nombre maximal d'itérations d'évaluation (${this.state.maxReviewIterations})`,
        });
        return this.getState();
      }
    }

    this.state.currentPhase = nextPhase;
    this.state.currentAgent = nextAgent;
    this.state.history.push({
      phase: nextPhase,
      agent: nextAgent,
      timestamp: new Date().toISOString(),
      note,
    });

    return this.getState();
  }
}
