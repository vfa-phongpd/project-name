import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { SUCCESS_RESPONSE } from 'src/common/custom-exceptions';
import { CustomResponse } from 'src/common/response_success';
import { JwtAuthGuard } from 'src/third-parties/guard/jwt-auth.guard';
import { RolesGuard } from 'src/third-parties/guard/role.guard';

import { ApiResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionGuard } from 'src/third-parties/guard/permission.guard';
import { Permissions } from 'src/third-parties/decorators/permission.decorator';
import { PERMISSION } from 'src/common/enum/permission.enum';

@ApiTags('groups')
@Controller('api/groups')
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PERMISSION.CREATE_GROUP)
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
  @Post('create')
  async createGroup(@Body() createGroupDto: CreateGroupDto, @Req() request) {
    await this.groupsService.createGroups(createGroupDto, request.user.id);
    return new CustomResponse(SUCCESS_RESPONSE.ResponseSuccess)
  }

}
