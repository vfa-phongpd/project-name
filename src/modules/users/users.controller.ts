import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/third-parties/guard/jwt-auth.guard';
import { CustomResponse } from '../../common/response_success';
import { SUCCESS_RESPONSE } from '../../common/custom-exceptions';
import { PermissionGuard } from 'src/third-parties/guard/permission.guard';
import { Permissions } from 'src/third-parties/decorators/permission.decorator';
import { PERMISSION } from 'src/common/enum/permission.enum';

@ApiTags('users')
@Controller('api/users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PERMISSION.CREATE_MEMBER)
  @Post('create')
  @ApiOperation({ summary: 'Create Users' })

  @ApiResponse({
    status: 200,
    description: 'Successful create',
    // Define your response schema here
    schema: {
      properties: {
        statusCode: { type: 'number' },
        data: {
          type: 'object',
          properties: {
            status: { type: 'int' },
            messsage: { type: 'string' }
          },
        },
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
        name: {
          type: 'string',
          example: "Phong",
          description: 'name users'
        },
        email: {
          type: 'string',
          example: 'Member1@gmail.com',
          description: "email users"
        },
        password: {
          type: 'string',
          example: 'Phong@123',
          description: "Password users"
        },
        gender: {
          type: 'int',
          example: 1,
          description: "0 is male, 1 is female "
        },
        birthday: {
          type: 'date',
          example: "2001-07-30",
          description: "yyyy/MM/DD"
        },
        role_id: {
          type: 'int',
          example: 2,
          description: '1 is admin, 2 is group admin, 3 is member'
        }
      }
    }
  })
  async create(@Body() createUserDto: CreateUserDto, @Req() request) {
    try {
      await this.usersService.createUser(createUserDto, request.user.id);
      return new CustomResponse(SUCCESS_RESPONSE.AdminCreateSuccess)
    } catch (error) {
      throw error
    }
  }



  @Get('get')
  get() {
    return this.usersService.getUsersWithVouchers()
  }

}
