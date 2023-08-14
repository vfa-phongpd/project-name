import { IsString, IsEmail, IsNumber, IsDate, IsOptional, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsNumber()
    gender: number;

    @IsNotEmpty()
    @IsDate()
    birthday: Date;

    @IsDate()
    last_login: Date | null;

    @IsNotEmpty()
    @IsDate()
    created_at: Date;

    @IsNotEmpty()
    @IsNumber()
    created_by: number;


    @IsNumber()
    updated_by: number | null;


    deleted_at: Date | null;


    updated_at: Date | null;

    @IsNumber()
    group_id: number | null;

    @IsNotEmpty()
    @IsNumber()
    role_id: number;
}
