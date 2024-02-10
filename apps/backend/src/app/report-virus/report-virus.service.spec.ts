import { Test, TestingModule } from '@nestjs/testing';
import { ReportVirusService } from './report-virus.service';

describe('ReportVirusService', () => {
  let service: ReportVirusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportVirusService],
    }).compile();

    service = module.get<ReportVirusService>(ReportVirusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
