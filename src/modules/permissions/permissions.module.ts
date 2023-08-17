import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from 'src/entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsService],
  exports: [PermissionsService]
})
export class PermissionsModule { }
