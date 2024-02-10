import { Global, Module } from '@nestjs/common';
import { VirusTotalController } from './virus-total.controller';
import { VirusTotalService } from './virus-total.service';
import { DomainController } from './domain.controller';
import { FilesController } from './files.controller';
import { UrlController } from './url.controller';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5
  })],
  controllers: [VirusTotalController, DomainController, FilesController, UrlController],
  providers: [VirusTotalService],
  exports: [VirusTotalService]
})
export class VirusTotalModule {
}
