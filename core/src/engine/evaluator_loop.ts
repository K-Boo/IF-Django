import { ReviewFeedback, ReviewFeedbackSchema } from '../agents/types.js';

export interface EvaluatorCriteria {
  minCoveragePercent: number;
  allowCriticalIssues: boolean;
  allowHighIssues: boolean;
}

export const DEFAULT_EVALUATOR_CRITERIA: EvaluatorCriteria = {
  minCoveragePercent: 80,
  allowCriticalIssues: false,
  allowHighIssues: false,
};

export class EvaluatorOptimizerLoop {
  private currentIteration = 0;
  private readonly maxIterations: number;
  private readonly criteria: EvaluatorCriteria;

  constructor(maxIterations = 3, criteria = DEFAULT_EVALUATOR_CRITERIA) {
    this.maxIterations = maxIterations;
    this.criteria = criteria;
  }

  public getIteration(): number {
    return this.currentIteration;
  }

  public evaluate(rawFeedback: unknown): ReviewFeedback {
    const feedback = ReviewFeedbackSchema.parse(rawFeedback);
    this.currentIteration = feedback.iteration;

    const criticalCount = feedback.issues.filter((i) => i.severity === 'CRITICAL').length;
    const highCount = feedback.issues.filter((i) => i.severity === 'HIGH').length;

    let computedStatus: 'APPROVED' | 'REJECTED' = 'APPROVED';

    if (!this.criteria.allowCriticalIssues && criticalCount > 0) {
      computedStatus = 'REJECTED';
    } else if (!this.criteria.allowHighIssues && highCount > 0) {
      computedStatus = 'REJECTED';
    }

    return {
      ...feedback,
      status: computedStatus,
    };
  }

  public shouldContinue(): boolean {
    return this.currentIteration < this.maxIterations;
  }

  public formatRemediationPlan(feedback: ReviewFeedback): string {
    if (feedback.status === 'APPROVED') {
      return '### Évaluation : SUCCÈS (APPROVED)\nToutes les exigences de sécurité et de qualité sont validées.';
    }

    const lines: string[] = [];
    lines.push(`### Rapport d'Évaluation : REJETÉ (Itération ${feedback.iteration}/${this.maxIterations})`);
    lines.push(`**Résumé** : ${feedback.summary}`);
    lines.push('\n#### Actions Correctives Prioritaires :');

    feedback.issues.forEach((issue, index) => {
      lines.push(`${index + 1}. **[${issue.severity}] ${issue.category}** - \`${issue.file}${issue.line ? `:${issue.line}` : ''}\``);
      lines.push(`   - *Problème* : ${issue.message}`);
      lines.push(`   - *Remédiation requise* : ${issue.remediation}`);
    });

    if (this.shouldContinue()) {
      lines.push('\n> **Consigne développeur** : Appliquer immédiatement les remédiations ci-dessus et relancer la suite de tests.');
    } else {
      lines.push('\n> **Alerte** : Nombre maximal de tentatives atteint. Escalade requise vers un superviseur humain.');
    }

    return lines.join('\n');
  }
}
