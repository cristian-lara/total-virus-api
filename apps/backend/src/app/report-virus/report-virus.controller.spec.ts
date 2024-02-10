import { Test, TestingModule } from '@nestjs/testing';
import { ReportVirusController } from './report-virus.controller';

describe('ReportVirusController', () => {
  let controller: ReportVirusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportVirusController],
    }).compile();

    controller = module.get<ReportVirusController>(ReportVirusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
