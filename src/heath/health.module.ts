
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from 'src/heath/health.controller';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController]
})
export class HealthModule { }
