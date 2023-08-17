import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { Group } from 'src/entities/group.entity';
import { User } from 'src/entities/user.entity';
import { ERROR_RESPONSE } from 'src/common/custom-exceptions';
import { ErrorCustom } from 'src/common/error-custom';

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    @InjectRepository(User) private readonly userRepository: Repository<User>

  ) { }

  async create(createGroupDto: CreateGroupDto, idCreate: number) {
    const { name, group_admin_id, members } = createGroupDto;

    const allGroup = await this.findAllGroup()
    const checkGroupAdmin = allGroup.find(group_id => group_id.group_admin_id === group_admin_id)

    if (checkGroupAdmin) {
      throw new ErrorCustom(ERROR_RESPONSE.AdminHasGroup)
    }
    const group = new Group();
    group.name = name;
    group.group_admin_id = group_admin_id;
    group.created_at = new Date();
    group.created_by = idCreate

    const createdGroup = await this.groupRepository.save(group);

    const membersToUpdate = await this.userRepository.find({
      where: {
        id: In(members),
      },
      relations: {
        group_id: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        group_id: {
          group_admin_id: true,
          name: true,
          group_id: true
        }
      }
    });

    const arrayUser = membersToUpdate.map(user => user.id)
    const checkExits = members.filter(id => !arrayUser.includes(id))
    console.log('checkExits', checkExits);

    if (checkExits.length > 0) {
      throw new ErrorCustom(ERROR_RESPONSE.UserNotExits, checkExits.join(', '))
    }

    for (const member of membersToUpdate) {
      if (member.group_id) {
        throw new ErrorCustom(ERROR_RESPONSE.MemberHasGroup, member.id)
      }
      member.updated_at = new Date()
      member.group_id = createdGroup;
    }
    await this.userRepository.save(membersToUpdate);
    return createdGroup;
  }

  async findAllGroup() {
    try {
      const findAllGroup = await this.groupRepository.find()
      return findAllGroup
    } catch (error) {
      throw new Error(error)
    }

  }

  findMembers(id: number) {
    return `This action returns a #${id} group`;
  }


}
