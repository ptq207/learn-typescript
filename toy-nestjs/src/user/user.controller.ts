import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Response } from 'src/common/response';
import { CreateUserRequest, UserData } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  public async getUserById(@Param() params): Promise<Response<UserData>> {
    try {
      const id = params.id;
      return await this.userService.findUserByID(id);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  @Post()
  public async createUser(
    @Body() createUserReq: CreateUserRequest,
  ): Promise<Response<UserData>> {
    try {
      return await this.userService.createUser(createUserReq);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
}
