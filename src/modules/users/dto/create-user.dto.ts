import { IsString, IsEmail, IsNumber, IsDate, IsOptional, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
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


    last_login: Date | null;

    created_at: Date;

    created_by: number;

    updated_by: number | null;

    deleted_at: Date | null;

    updated_at: Date | null;

    group_id: number

    @IsNotEmpty({ message: 'Role is required' })
    role_id: number
}


