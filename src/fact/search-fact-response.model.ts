import { Fact } from './fact.model';

export interface SearchFactResponse {
  total: number;
  result: Fact[];
}
