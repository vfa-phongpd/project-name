import { IsString, IsEmail, IsNumber, IsDate, IsOptional, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Group } from 'src/entities/group.entity';
import { Role } from 'src/entities/role.entity';


export class CreateUserDto {


    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;


    password: string;

    @IsNotEmpty()
    @IsNumber()
    gender: number;

    @IsNotEmpty()
    birthday: Date;


    last_login: Date | null;

    created_at: Date;

    created_by: number;

    updated_by: number | null;

    deleted_at: Date | null;

    updated_at: Date | null;

    group_id: number

    @IsNotEmpty()
    role_id: number
}


