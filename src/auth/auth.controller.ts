import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserAuthDto } from './dto/login-auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/vendors/guard/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/vendors/guard/role.guard';
import { Roles } from 'src/vendors/decorators/role.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin/login')
  // @Roles('admin group', "admin")
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    // Define your response schema here
    schema: {
      properties: {
        statusCode: { type: 'number' },
        data: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            user_id: { type: 'int' },
            access_token: { type: 'string' },
            refresh_token: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
    // Define your error response schema here
    schema: {
      properties: {
        code: { type: 'string' },
        status: { type: 'number' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    // Define your error response schema here
    schema: {
      properties: {
        code: { type: 'string' },
        status: { type: 'number' },
        message: { type: 'string' },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'Admin@gmail.com',
          description: "email users"
        },
        password: {
          type: 'string',
          example: 'Phong@123',
          description: "Password users"
        }
      }
    }
  })
  async login(@Body() LoginUserDto: LoginUserAuthDto) {
    const dataLogin = await this.authService.login(LoginUserDto.email, LoginUserDto.password)
    return {
      message: "success",
      dataLogin
    }
  }

}
