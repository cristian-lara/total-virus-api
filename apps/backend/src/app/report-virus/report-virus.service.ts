import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportVirusEntity } from './report-virus.entity';
import { CreateReportVirusDto, UpdateReportVirusDto } from './report-virus.controller';

@Injectable()
export class ReportVirusService {
  constructor(
    @InjectRepository(ReportVirusEntity)
    private readonly reportVirusRepository: Repository<ReportVirusEntity>,
  ) {}

  create(reportData: CreateReportVirusDto): Promise<ReportVirusEntity> {
    const report = this.reportVirusRepository.create(reportData);
    return this.reportVirusRepository.save(report);
  }

  findAll(): Promise<ReportVirusEntity[]> {
    return this.reportVirusRepository.find();
  }

  findOne(id: string): Promise<ReportVirusEntity> {
    return this.reportVirusRepository.findOneBy({ id });
  }

  async update(id: string, updateData: UpdateReportVirusDto): Promise<ReportVirusEntity> {
    const report = await this.reportVirusRepository.preload({
      id: id,
      ...updateData,
    });
    if (!report) {
      throw new Error('Report not found');
    }
    return this.reportVirusRepository.save(report);
  }

  async remove(id: string): Promise<void> {
    await this.reportVirusRepository.delete(id);
  }
}
