import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ReportVirusService } from '../report-virus/report-virus.service';
import { VirusTotalService } from './virus-total.service';

@Controller('virus-total')
export class VirusTotalController {

  constructor(private readonly virusTotalService: VirusTotalService) {}

  @Get('ip/:ipAddress')
  async getIpAddressDetails(@Param('ipAddress') ipAddress: string) {
    return await this.virusTotalService.getIpAddressReport(ipAddress);
  }

  @Get('ip/:ipAddress/comments')
  async getCommentsOnIpAddress(@Param('ipAddress') ipAddress: string) {
    return await this.virusTotalService.getCommentsOnIpAddress(ipAddress);
  }

  @Post('ip/:ipAddress/comments')
  @HttpCode(HttpStatus.CREATED)
  async addCommentToIpAddress(
    @Param('ipAddress') ipAddress: string,
    @Body('comment') comment: string
  ) {
    return await this.virusTotalService.addCommentToIpAddress(ipAddress, comment);
  }

  @Get('ip/:ipAddress/related')
  async getRelatedObjectsToIpAddress(@Param('ipAddress') ipAddress: string) {
    return await this.virusTotalService.getRelatedObjectsToIpAddress(ipAddress);
  }

  @Get('ip/:ipAddress/object-relations')
  async getObjectDescriptorsRelatedToIpAddress(@Param('ipAddress') ipAddress: string) {
    return await this.virusTotalService.getObjectDescriptorsRelatedToIpAddress(ipAddress);
  }

  @Get('ip/:ipAddress/votes')
  async getVotesOnIpAddress(@Param('ipAddress') ipAddress: string) {
    return await this.virusTotalService.getVotesOnIpAddress(ipAddress);
  }

  @Post('ip/:ipAddress/votes')
  @HttpCode(HttpStatus.CREATED)
  async addVoteToIpAddress(
    @Param('ipAddress') ipAddress: string,
    @Body('vote') vote: 'harmless' | 'malicious'
  ) {
    return await this.virusTotalService.addVoteToIpAddress(ipAddress, vote);
  }
}
