import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'entities/user.entity';
import { ResponseStatus } from 'types';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth() // adds authorization header with Bearer token to Swagger UI
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user profile by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user profile with the specified ID',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getUserProfile(
    @Param('id') id: string,
  ): Promise<ResponseStatus<Omit<User, 'password'>>> {
    return this.userService.getUserProfile(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated user profile',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  updateUserProfile(
    @Body() dto: UpdateUserDto,
  ): Promise<ResponseStatus<Omit<User, 'password'>>> {
    return this.userService.updateUserProfile(dto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all users',
    type: [User], // Assuming your UserService.getAllUsers() returns an array of User
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}