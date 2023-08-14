import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { User } from 'src/users/entities/user.entity';
import { User } from '.././users/entities/user.entity'
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStategy } from 'src/vendors/stategy/accesstoken.stategy';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AccessTokenStategy],
  // exports: [AuthService, AuthController]
})
export class AuthModule { }
