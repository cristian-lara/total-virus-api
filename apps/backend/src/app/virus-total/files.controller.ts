import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VirusTotalService } from './virus-total.service';

@Controller('files')
export class FilesController {
  constructor(private readonly virusTotalService: VirusTotalService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return await this.virusTotalService.uploadFile(file);
  }

  @Get('upload-url')
  async getUploadUrlForLargeFiles() {
    return await this.virusTotalService.getUploadUrlForLargeFiles();
  }

  @Get(':fileId')
  async getFileReport(@Param('fileId') fileId: string) {
    return await this.virusTotalService.getFileReport(fileId);
  }
  @Get('/details/:fileId')
  async getFileReport2(@Param('fileId') fileId: string) {
    return await this.virusTotalService.getFileReport2(fileId);
  }

  @Post(':fileId/rescan')
  @HttpCode(HttpStatus.OK)
  async requestFileRescan(@Param('fileId') fileId: string) {
    return await this.virusTotalService.requestFileRescan(fileId);
  }

  @Get(':fileId/download-url')
  async getFileDownloadUrl(@Param('fileId') fileId: string) {
    return await this.virusTotalService.getFileDownloadUrl(fileId);
  }

  @Get(':fileId/comments')
  async getCommentsOnFile(@Param('fileId') fileId: string) {
    return await this.virusTotalService.getCommentsOnFile(fileId);
  }

  @Post(':fileId/comments')
  @HttpCode(HttpStatus.CREATED)
  async addCommentToFile(
    @Param('fileId') fileId: string,
    @Body('comment') comment: string
  ) {
    return await this.virusTotalService.addCommentToFile(fileId, comment);
  }

  @Get(':fileId/related')
  async getRelatedObjectsToFile(@Param('fileId') fileId: string) {
    return await this.virusTotalService.getRelatedObjectsToFile(fileId);
  }

  @Get(':fileId/object-relations')
  async getObjectDescriptorsRelatedToFile(@Param('fileId') fileId: string) {
    return await this.virusTotalService.getObjectDescriptorsRelatedToFile(fileId);
  }

  @Get(':fileId/sigma')
  async getCrowdsourcedSigmaRule(@Param('fileId') fileId: string) {
    return await this.virusTotalService.getCrowdsourcedSigmaRule(fileId);
  }

  @Get(':fileId/yara')
  async getCrowdsourcedYARARuleset(@Param('fileId') fileId: string) {
    return await this.virusTotalService.getCrowdsourcedYARARuleset(fileId);
  }

  @Get(':fileId/votes')
  async getVotesOnFile(@Param('fileId') fileId: string) {
    return await this.virusTotalService.getVotesOnFile(fileId);
  }

  @Post(':fileId/votes')
  @HttpCode(HttpStatus.CREATED)
  async addVoteToFile(
    @Param('fileId') fileId: string,
    @Body('vote') vote: 'harmless' | 'malicious'
  ) {
    return await this.virusTotalService.addVoteToFile(fileId, vote);
  }
}
