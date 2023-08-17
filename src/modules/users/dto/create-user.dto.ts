import { IsString, IsEmail, IsNumber, IsDate, IsOptional, IsNotEmpty, MinLength, MaxLength, IsIn } from 'class-validator';
import { ROLE } from 'src/common/enum/role.enum';
import { Group } from 'src/entities/group.entity';
import { Role } from 'src/entities/role.entity';



export class CreateUserDto {

    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;


    password: string;

    @IsNotEmpty({ message: 'Gender is required 1 or 0' })
    @IsNumber()
    gender: number;

    @IsNotEmpty({ message: 'Birthday is required' })
    birthday: Date;

    group_id: number

    @IsNotEmpty({ message: 'Role is required' })
    @IsIn([ROLE.ADMIN, ROLE.GROUP_ADMIN, ROLE.MEMBER], { message: 'Invalid role' })
    role_id: number
}


