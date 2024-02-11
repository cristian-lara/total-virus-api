import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntities } from '../../constants/constants';
import { UserEntity } from './user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
