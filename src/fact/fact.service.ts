import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class FactService {
  constructor(private httpService: HttpService) {}

  getRandomFact() {
    return this.httpService
      .get('https://api.chucknorris.io/jokes/random')
      .pipe(map((response) => response.data));
  }

  searchFacts(query: string) {
    return this.httpService
      .get(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .pipe(map((response) => response.data));
  }
}
