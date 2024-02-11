import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('find-or-create')
  async findOrCreate(@Body() body: { idAuth0: string, email: string }): Promise<UserEntity> {
    const { idAuth0, email } = body;
    if (!idAuth0 || !email) {
      throw new BadRequestException('idAuth0 and email are required');
    }
    return this.userService.findOrCreateUser(idAuth0, email);
  }
}
