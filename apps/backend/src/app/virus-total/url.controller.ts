import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { VirusTotalService } from './virus-total.service';

@Controller('urls')
export class UrlController {
  constructor(private readonly virusTotalService: VirusTotalService) {}

  @Post('scan')
  async scanUrl(@Body('url') url: string) {
    return await this.virusTotalService.scanUrl(url);
  }

  @Get('report/:urlId')
  async getUrlAnalysisReport(@Param('urlId') urlId: string) {
    return await this.virusTotalService.getUrlAnalysisReport(urlId);
  }

  @Post('rescan/:urlId')
  @HttpCode(HttpStatus.OK)
  async requestUrlRescan(@Param('urlId') urlId: string) {
    return await this.virusTotalService.requestUrlRescan(urlId);
  }

  @Get('comments/:urlId')
  async getCommentsOnUrl(@Param('urlId') urlId: string) {
    return await this.virusTotalService.getCommentsOnUrl(urlId);
  }

  @Post('comments/:urlId')
  @HttpCode(HttpStatus.CREATED)
  async addCommentToUrl(
    @Param('urlId') urlId: string,
    @Body('comment') comment: string
  ) {
    return await this.virusTotalService.addCommentToUrl(urlId, comment);
  }

  @Get('related/:urlId')
  async getRelatedObjectsToUrl(@Param('urlId') urlId: string) {
    return await this.virusTotalService.getRelatedObjectsToUrl(urlId);
  }

  @Get('object-relations/:urlId')
  async getObjectDescriptorsRelatedToUrl(@Param('urlId') urlId: string) {
    return await this.virusTotalService.getObjectDescriptorsRelatedToUrl(urlId);
  }

  @Get('votes/:urlId')
  async getVotesOnUrl(@Param('urlId') urlId: string) {
    return await this.virusTotalService.getVotesOnUrl(urlId);
  }

  @Post('votes/:urlId')
  @HttpCode(HttpStatus.CREATED)
  async addVoteToUrl(
    @Param('urlId') urlId: string,
    @Body('vote') vote: 'harmless' | 'malicious'
  ) {
    return await this.virusTotalService.addVoteToUrl(urlId, vote);
  }
}
