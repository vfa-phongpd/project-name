import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateGroupDto {
    @ApiProperty({
        example: 'Group Name',
        description: 'Name of the group',
    })
    @IsNotEmpty({ message: 'Name Admin is required' })
    name: string;

    @ApiProperty({
        example: 1,
        description: 'ID of the group admin',
    })
    @IsNotEmpty({ message: 'ID Admin is required' })
    group_admin_id: number;

    @ApiProperty({
        example: [1, 2],
        description: 'Array of member IDs',
    })
    @IsNotEmpty({ message: 'Members is required' })
    members: number[];
}


