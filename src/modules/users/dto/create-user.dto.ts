import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNumber, IsDate, IsOptional, IsNotEmpty, MinLength, MaxLength, IsIn } from 'class-validator';
import { ROLE } from 'src/common/enum/role.enum';
import { Group } from 'src/entities/group.entity';
import { Role } from 'src/entities/role.entity';



export class CreateUserDto {

    @ApiProperty({
        example: 'John Doe',
        description: 'Name of the user',
    })
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({
        example: 'user@example.com',
        description: 'Email address of the user',
    })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({
        description: 'Password for the user',
    })
    password: string;

    @ApiProperty({
        example: 1,
        description: 'Gender of the user (1 for male, 0 for female)',
    })
    @IsNotEmpty({ message: 'Gender is required (1 or 0)' })
    @IsNumber()
    gender: number;

    @ApiProperty({
        description: 'Birthday of the user',
    })
    @IsNotEmpty({ message: 'Birthday is required' })
    @IsDate()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    birthday: Date;


    @ApiProperty({
        example: ROLE.MEMBER,
        description: 'Role of the user',
        enum: ROLE,
    })
    @IsNotEmpty({ message: 'Role is required' })
    @IsIn([ROLE.ADMIN, ROLE.GROUP_ADMIN, ROLE.MEMBER], { message: 'Invalid role' })
    role_id: number
}


