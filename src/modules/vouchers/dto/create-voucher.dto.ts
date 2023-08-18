import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateVoucherDto {


    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Expired_date is required' })
    expired_date: Date

    @IsNotEmpty({ message: 'Detail is required' })
    detail: string;

    @IsNotEmpty({ message: 'Assign_groups is required' })
    @Type(() => Number)
    assign_groups: number[];
}
