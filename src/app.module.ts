import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './db/mysql';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { RolesModule } from './modules/roles/roles.module';
import { GroupsModule } from './modules/groups/groups.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolePermissionsModule } from './modules/role_permissions/role_permissions.module';
import { AuthModule } from './modules/auth/auth.module';
import { GroupsService } from './modules/groups/groups.service';
import { RolesService } from './modules/roles/roles.service';
import { PermissionsService } from './modules/permissions/permissions.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { Group } from './entities/group.entity';
import { VouchersModule } from './modules/vouchers/vouchers.module';
import { GroupsVouchersModule } from './modules/groups_vouchers/groups_vouchers.module';

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
    UsersModule, RolesModule, GroupsModule, PermissionsModule, RolePermissionsModule, AuthModule, VouchersModule, GroupsVouchersModule],
  controllers: [AppController],
  providers: [AppService, UsersService, GroupsService, RolesService, PermissionsService],
})
export class AppModule { }
