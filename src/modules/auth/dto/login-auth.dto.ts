
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class LoginUserAuthDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'Email address of the user',
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({
        example: 'securepassword123',
        description: 'Password for the user',
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
    password: string;
}
