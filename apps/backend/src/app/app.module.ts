import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ReportVirusModule } from './report-virus/report-virus.module';
import { UserModule } from './user/user.module';
import { reportVirusEntities, userEntities } from '../constants/constants';
import { HttpModule } from '@nestjs/axios';
import { VirusTotalModule } from './virus-total/virus-total.module';
import { UserEntity } from './user/user.entity';
import { ReportVirusEntity } from './report-virus/report-virus.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [UserEntity, ReportVirusEntity],
        synchronize: true,
        dropSchema: true,
        logging: true,
      }),
    }),
    ReportVirusModule,
    UserModule,
    VirusTotalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
