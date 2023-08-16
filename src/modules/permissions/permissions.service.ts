import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {

  @InjectRepository(Permission)
  private readonly permissionRepository: Repository<Permission>


  async getPermissionsForRoleId(roleId: number): Promise<Permission[]> {
    const permissions = await this.permissionRepository
      .createQueryBuilder('permission')
      .innerJoin('permission.roles_permissions', 'roles_permission')
      .where('roles_permission.role_id = :roleId', { roleId })
      .getMany();

    return permissions;
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
