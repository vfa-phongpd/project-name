import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateVoucherDto {


    @ApiProperty({
        description: 'Name of the entity',
        type: 'string',
        format: 'binary'
    })
    image: string;

    @ApiProperty({
        description: 'Name of the entity',
    })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({
        type: Date,
        description: 'Expiration date of the entity',
        example: '2023-08-31T00:00:00.000Z',
    })
    @IsNotEmpty({ message: 'Expired_date is required' })
    @IsDate()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    expired_date: Date;

    @ApiProperty({
        description: 'Details of the entity',
    })
    @IsNotEmpty({ message: 'Detail is required' })
    detail: string;

    @ApiProperty({
        description: 'Array of group IDs assigned to the entity',
        type: [Number],
        example: [1, 2, 3],
    })
    @IsNotEmpty({ message: 'Assign_groups is required' })
    @Type(() => Number)
    @IsNumber({}, { each: true, message: 'Assign_groups must be a Number' })
    assign_groups: number[];
}
