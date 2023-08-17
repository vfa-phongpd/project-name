import { IsNotEmpty } from "class-validator";


export class CreateGroupDto {


    name: string;

    @IsNotEmpty({ message: 'ID Admin is required' })
    group_admin_id: number;

<<<<<<< HEAD
    @IsNotEmpty({ message: 'Members is required' })
    members: string[];
=======
    @IsNotEmpty()
    members: number[];
>>>>>>> update-api-createGroups

    created_at: Date;

    created_by: Number;

    deleted_at: Date;


    updated_at: Date;

    updated_by: Number;

}
