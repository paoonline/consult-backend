// app.module.ts or any feature module
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './api';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [ApiService],
  exports: [ApiService, HttpModule],
})
export class ApiModule {}
