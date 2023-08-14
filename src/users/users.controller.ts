import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Injectable, UseGuards, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/vendors/guard/jwt-auth.guard';



@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }




  @UseGuards(JwtAuthGuard)
  @Post('api/users/create')
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

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
