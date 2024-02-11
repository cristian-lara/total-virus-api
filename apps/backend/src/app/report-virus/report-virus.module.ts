import { Global, Module } from '@nestjs/common';
import { ReportVirusController } from './report-virus.controller';
import { ReportVirusService } from './report-virus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportVirusEntity } from './report-virus.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([ReportVirusEntity])
  ],
  controllers: [ReportVirusController],
  providers: [ReportVirusService],
  exports: [ReportVirusService]
})
export class ReportVirusModule {}
