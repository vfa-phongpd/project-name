import { IsNotEmpty } from "class-validator";


export class CreateGroupDto {


    name: string;

    @IsNotEmpty({ message: 'ID Admin is required' })
    group_admin_id: number;

    @IsNotEmpty()
    members: number[];

    created_at: Date;

    created_by: Number;

    deleted_at: Date;


    updated_at: Date;

    updated_by: Number;

}
