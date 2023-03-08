import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get')
  async index() {
    return await this.userService.findAll();
  }

  @Get('/query')
  async query(@Query() q) {
    console.log(q, '====');
    return await this.userService.find(q.job_num);
  }

  @Get('/add')
  async add() {
    await this.userService.insert();
    return {
      success: true,
      data: null,
      msg: {},
    };
  }
}
