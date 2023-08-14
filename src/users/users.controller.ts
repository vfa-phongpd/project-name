import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Injectable, UseGuards, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/vendors/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/vendors/guard/role.guard';
import { Roles } from 'src/vendors/decorators/role.decorator';


@ApiTags('users')
@Controller('api/users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }




  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin group', "admin")
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
    const { email } = createUserDto
    const checkEmailValid = await this.usersService.findOne(email)
    if (checkEmailValid) {
      return {
        code: "A0002",
        status: 400,
        messsage: "Cannot insert data to database"
      }
    }

    this.usersService.createUser(createUserDto, request.user.email);
    return {
      status: 200,
      message: "Success"
    };
  }

}
