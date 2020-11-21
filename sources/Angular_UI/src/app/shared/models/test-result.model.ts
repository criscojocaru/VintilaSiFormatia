import { OverallStats } from './overall-stats.model';
import { PerClassStats } from './per-class-stats.model';

export interface TestResult {
    accuracy: number;
    confusionMatrix: number[][];
    hitsAtK: number;
    loss: number;
    overallStats: OverallStats;
    perClassStats: Map<Number, PerClassStats>;
}
