import { IsNotEmpty } from "class-validator";

export class CreateVoucherDto {

    @IsNotEmpty({ message: 'Image is required' })
    image: string;

    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Expired_date is required' })
    expired_date: Date

    @IsNotEmpty({ message: 'Detail is required' })
    detail: string;

    @IsNotEmpty({ message: 'Assign_groups is required' })
    assign_groups: string[];
}
