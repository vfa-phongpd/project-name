import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserAuthDto } from './dto/login-auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomResponse } from '../../common/response_success';
import { SUCCESS_RESPONSE } from '../../common/custom-exceptions';




@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('admin/login')
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
    return new CustomResponse(SUCCESS_RESPONSE.AdminLoginSuccess, {
      name: dataLogin.data.name,
      user_id: dataLogin.data.user_id,
      user_role: dataLogin.data.user_role,
      access_token: dataLogin.data.access_token,
      refresh_token: dataLogin.data.refresh_token,
    })
  }

}
