import { Args, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Fact } from './fact.model';
import { FactService } from './fact.service';
import { SearchFactResponse } from './search-fact-response.model';

@Resolver()
export class FactResolver {
  constructor(private factService: FactService) {}

  @Query('random')
  random(): Observable<Fact> {
    return this.factService.getRandomFact();
  }

  @Query('searchFacts')
  searchFact(
    @Args('query', { type: () => String }) query: string,
  ): Observable<SearchFactResponse> {
    return this.factService.searchFacts(query);
  }
}
