import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOrCreateUser(idAuth0: string, email: string): Promise<UserEntity> {
    let user = await this.userRepository.findOne({ where: { idAuth0: idAuth0 } });

    if (!user) {
      user = this.userRepository.create({ idAuth0: idAuth0, email: email });
      await this.userRepository.save(user);
    }

    return user;
  }
}
