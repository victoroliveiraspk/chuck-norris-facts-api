import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FactResolver } from './fact.resolver';
import { FactService } from './fact.service';

@Module({
  imports: [HttpModule],
  providers: [FactService, FactResolver],
  exports: [HttpModule],
})
export class FactModule {}
