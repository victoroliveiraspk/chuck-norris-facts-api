import { Args, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { FactService } from './fact.service';

@Resolver()
export class FactResolver {
  constructor(private factService: FactService) {}

  @Query('random')
  random() {
    return this.factService.getRandomFact();
  }

  @Query('searchFacts')
  searchFact(@Args('query', { type: () => String }) query: string) {
    return this.factService.searchFacts(query);
  }
}
