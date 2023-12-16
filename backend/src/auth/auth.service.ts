import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../entities/user.entity';
import { ERROR_EXCEPTION, ResponseStatus, SUCCESS_EXCEPTION } from 'types';
import { compare, hashPassword } from 'utils';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto';
import { UserLogin, UserRegister } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: LoginDto): Promise<ResponseStatus<UserLogin>> {
    const user = await this.userModel.findOne({ email: userDto.email }).lean();
    if (user && (await compare(userDto.password, user.password))) {
      return {
        code: HttpStatus.OK,
        message: SUCCESS_EXCEPTION.OK,
        data: {
          id: user._id,
          createdAt: user.createdAt,
          email: user.email,
          name: user.name,
          gender: user.gender,
          birthDay: user.birthDay,
          accessToken: this.jwtService.sign(user),
          phoneNumber: user.phoneNumber,
        },
      };
    }

    throw new HttpException(
      ERROR_EXCEPTION.LOGIN_FAILED,
      HttpStatus.BAD_REQUEST,
    );
  }

  async register(userDto: RegisterDto): Promise<ResponseStatus<UserRegister>> {
    const user = await this.userModel.findOne({ email: userDto.email });
    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }


    const newUser = await this.userModel.create({
      ...userDto,
      password: await hashPassword(userDto.password),
    });


    return {
      code: HttpStatus.OK,
      message: SUCCESS_EXCEPTION.OK,
      data: {
        createdAt: newUser.createdAt,
        email: newUser.email,
      },
    };
  }

}