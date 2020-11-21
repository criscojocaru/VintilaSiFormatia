import { Combined } from './combined.model';
import { TestResult } from './test-result.model';

export interface EvaluateResponse {
    combined: Combined;
    testResult: TestResult;
}
