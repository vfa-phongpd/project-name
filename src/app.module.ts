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
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions), UsersModule, RolesModule, GroupsModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
