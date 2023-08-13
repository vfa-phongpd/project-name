import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './db/mysql';
import { RolesModule } from './roles/roles.module';
import { GroupsModule } from './groups/groups.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersService } from './users/users.service';
import { GroupsService } from './groups/groups.service';
import { RolesService } from './roles/roles.service';
import { PermissionsService } from './permissions/permissions.service';
import { Role } from './roles/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import { Group } from './groups/entities/group.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RolePermissionsModule } from './role_permissions/role_permissions.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenStategy } from './stategy/accesstoken.stategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User, Role, Permission, Group]),
    JwtModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: process.env.accessToken,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule, RolesModule, GroupsModule, PermissionsModule, RolePermissionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UsersService, GroupsService, RolesService, PermissionsService],
})
export class AppModule { }
