import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { SUCCESS_RESPONSE } from 'src/common/custom-exceptions';
import { CustomResponse } from 'src/common/response_success';
import { JwtAuthGuard } from 'src/third-parties/guard/jwt-auth.guard';
import { RolesGuard } from 'src/third-parties/guard/role.guard';
import { Roles } from 'src/third-parties/decorators/role.decorator';
import { Role } from 'src/common/enum/role.enum';
import { ApiResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('groups')
@Controller('api/groups')
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('create')
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
          example: "ABC",
          description: 'name users'
        },
        group_admin_id: {
          type: 'string',
          example: '2',
          description: "email users"
        },
        members: {
          type: 'string[]',
          example: ["phongpha1n@gmail.com", "phongpha2n@gmail.com"],
          description: "Password users"
        },

      }
    }
  })
  async createGroup(@Body() createGroupDto: CreateGroupDto, @Req() request) {
    await this.groupsService.create(createGroupDto, request.user.id);
    return new CustomResponse(SUCCESS_RESPONSE.ResponseSuccess)
  }

}
