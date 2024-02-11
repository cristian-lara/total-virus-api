import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ReportVirusService } from './report-virus.service';
import { VirusReportType } from '../../constants/constants';
export class CreateReportVirusDto {
  type: VirusReportType;
  reportDetail: any;
}

export class UpdateReportVirusDto {
  type?: VirusReportType;
  reportDetail?: any;
}

@Controller('report-virus')
export class ReportVirusController {
  constructor(private readonly reportVirusService: ReportVirusService) {}

  @Post()
  create(@Body() createReportVirusDto: CreateReportVirusDto) {
    return this.reportVirusService.create(createReportVirusDto);
  }

  @Get()
  findAll() {
    return this.reportVirusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportVirusService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReportVirusDto: UpdateReportVirusDto) {
    return this.reportVirusService.update(id, updateReportVirusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportVirusService.remove(id);
  }
}
