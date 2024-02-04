import { Test, TestingModule } from '@nestjs/testing';
import { VirusTotalController } from './virus-total.controller';

describe('VirusTotalController', () => {
  let controller: VirusTotalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VirusTotalController],
    }).compile();

    controller = module.get<VirusTotalController>(VirusTotalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
