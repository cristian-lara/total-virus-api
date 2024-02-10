import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { VirusTotalService } from './virus-total.service';

@Controller('domains')
export class DomainController {
  constructor(private readonly virusTotalService: VirusTotalService) {}

  @Get(':domain')
  async getDomainReport(@Param('domain') domain: string) {
    return await this.virusTotalService.getDomainReport(domain);
  }

  @Get(':domain/comments')
  async getCommentsOnDomain(@Param('domain') domain: string) {
    return await this.virusTotalService.getCommentsOnDomain(domain);
  }

  @Post(':domain/comments')
  @HttpCode(HttpStatus.CREATED)
  async addCommentToDomain(
    @Param('domain') domain: string,
    @Body('comment') comment: string
  ) {
    return await this.virusTotalService.addCommentToDomain(domain, comment);
  }

  @Get(':domain/related')
  async getRelatedObjectsToDomain(@Param('domain') domain: string) {
    return await this.virusTotalService.getRelatedObjectsToDomain(domain);
  }

  @Get(':domain/object-relations')
  async getObjectDescriptorsRelatedToDomain(@Param('domain') domain: string) {
    return await this.virusTotalService.getObjectDescriptorsRelatedToDomain(domain);
  }

  @Get(':domain/resolutions')
  async getDNSResolutionObject(@Param('domain') domain: string) {
    return await this.virusTotalService.getDNSResolutionObject(domain);
  }

  @Get(':domain/votes')
  async getVotesOnDomain(@Param('domain') domain: string) {
    return await this.virusTotalService.getVotesOnDomain(domain);
  }

  @Post(':domain/votes')
  @HttpCode(HttpStatus.CREATED)
  async addVoteToDomain(
    @Param('domain') domain: string,
    @Body('vote') vote: 'harmless' | 'malicious'
  ) {
    return await this.virusTotalService.addVoteToDomain(domain, vote);
  }
}
