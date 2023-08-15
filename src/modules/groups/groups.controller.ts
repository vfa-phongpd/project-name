import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';


@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

}
