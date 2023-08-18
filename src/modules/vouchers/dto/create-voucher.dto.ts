import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateVoucherDto {


    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Expired_date is required' })
    expired_date: Date

    @IsNotEmpty({ message: 'Detail is required' })
    detail: string;

    @IsNotEmpty({ message: 'Assign_groups is required' })
    @Type(() => Number)
    @IsNumber({}, { each: true, message: 'Assign_groups must is Number' })
    assign_groups: number[];
}
