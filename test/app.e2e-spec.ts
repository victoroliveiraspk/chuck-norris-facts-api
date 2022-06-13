import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { randomFactQuery } from './queries/random-fact.query';
import { searchFactsQuery } from './queries/search-facts.query';

describe('Graphql (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('random fact', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: randomFactQuery })
      .expect(200)
      .then((response) => {
        expect(response.body.data?.random).not.toBeUndefined();
      });
  });

  it('search fact with result', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: searchFactsQuery, variables: { query: 'teste' } })
      .expect(200)
      .then((response) => {
        expect(
          response.body.data?.searchFacts?.result?.length,
        ).toBeGreaterThanOrEqual(1);
      });
  });

  it('search fact without result', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: searchFactsQuery, variables: { query: 'testeteste' } })
      .expect(200)
      .then((response) => {
        expect(response.body?.data?.searchFacts?.result?.length).toBe(0);
      });
  });

  it('search fact with invalid query', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: searchFactsQuery, variables: { query: 'a' } })
      .expect(200)
      .then((response) => {
        expect(response.body?.errors?.length).toBeGreaterThanOrEqual(1);
      });
  });
});
