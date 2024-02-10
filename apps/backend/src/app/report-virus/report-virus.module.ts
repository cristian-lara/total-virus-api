import { Global, Module } from '@nestjs/common';
import { ReportVirusController } from './report-virus.controller';
import { ReportVirusService } from './report-virus.service';

@Global()
@Module({
  controllers: [ReportVirusController],
  providers: [ReportVirusService],
  exports: [ReportVirusService]
})
export class ReportVirusModule {}
