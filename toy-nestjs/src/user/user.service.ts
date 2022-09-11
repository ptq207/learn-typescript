import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapUserData } from 'src/utils/user';
import { Repository } from 'typeorm';
import { ICreateUserRequest, ILoginRequest } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { IUserData } from './dto/user.dto';
import * as Bcrypt from 'bcrypt';
import { Response } from 'src/common/response';
import { buildResponse } from 'src/utils/common';
import { HttpCode } from 'src/common/httpcode';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
		private configServer: ConfigService
  ) {
    console.log('aaaaaaaaaaa');
  }

  public async login(req: ILoginRequest): Promise<Response<any>> {
    try {
      const { username, password } = req;
      const user: UserEntity = await this.userRepository.findOne({
        where: { username: username },
      });
      if (!user) {
        return buildResponse(
          null,
          HttpCode.HTTP_BAD_REQUEST,
          'User does not exist',
        );
      }

			const matchPassword = Bcrypt.compareSync(password, user.password);
			if (!matchPassword) {
				return buildResponse(
					null,
					HttpCode.HTTP_BAD_REQUEST,
					'Password not match'
				);
			}

    } catch (err) {
			return buildResponse(null, HttpCode.HTTP_INTERNAL_SERVER_ERROR, `Error: ${err.message}`);
		}
  }

  public async findUserByID(id: string): Promise<Response<IUserData>> {
    try {
      const user: UserEntity = await this.userRepository.findOne({
        where: { userID: id },
      });
      const userData = mapUserData(user);
      return buildResponse(userData, HttpCode.HTTP_STATUS_OK, '');
    } catch (err) {
      return buildResponse(
        null,
        HttpCode.HTTP_INTERNAL_SERVER_ERROR,
        `Error occurs: ${err.message}`,
      );
    }
  }

  public async createUser(req: ICreateUserRequest): Promise<Response<IUserData>> {
    try {
      const { username, email, password, dob, avatar } = req;
      const checkUser: UserEntity = await this.userRepository.findOne({
        where: [{ username: username }, { email: email }],
      });
      if (checkUser) {
        return buildResponse(
          null,
          HttpCode.HTTP_BAD_REQUEST,
          'Error: User already exists',
        );
      }

      const hashedPassword = Bcrypt.hashSync(password, Bcrypt.genSaltSync());
      const createdUser: UserEntity = await this.userRepository.save({
        username: username,
        email: email,
        password: hashedPassword,
        dob: dob,
        avatar: avatar,
        registeredAt: new Date(),
        isActive: true,
      });
      const userData = mapUserData(createdUser);
      return buildResponse(
        userData,
        HttpCode.HTTP_STATUS_CREATED,
        'Created new user successfully',
      );
    } catch (err) {
      return buildResponse(
        null,
        HttpCode.HTTP_STATUS_CREATED,
        `Error while creating user: ${err.message}`,
      );
    }
  }
}
