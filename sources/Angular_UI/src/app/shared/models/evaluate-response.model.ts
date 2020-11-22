import { Combined } from './combined.model';
import { Prediction } from './prediction.model';
import { TestResult } from './test-result.model';

export interface EvaluateResponse {
    combined: Combined;
    testResult: TestResult;
    predictions?: Prediction[];
}
