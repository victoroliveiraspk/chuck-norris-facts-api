import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { Fact } from './fact.model';
import { SearchFactResponse } from './search-fact-response.model';

@Injectable()
export class FactService {
  constructor(private httpService: HttpService) {}

  getRandomFact(): Observable<Fact> {
    return this.httpService
      .get('https://api.chucknorris.io/jokes/random')
      .pipe(map((response) => response.data));
  }

  searchFacts(query: string): Observable<SearchFactResponse> {
    if (query.length < 3) {
      throw new Error('Search must be at least 2 characters.');
    }

    return this.httpService
      .get(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .pipe(map((response) => response.data));
  }
}
