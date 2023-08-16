import { Exclude } from "class-transformer";
import { IsNotEmpty, IsEmail, MaxLength } from "class-validator";
import { PrimaryGeneratedColumn, Column } from "typeorm";
import { Group } from "./group.entity";

export class Voucher {


    @PrimaryGeneratedColumn()
    id: number;

    image: string;

    @IsNotEmpty({ message: 'Name can not be null or empty' })
    @Column({ type: 'varchar', length: 50, nullable: false, name: 'name' })
    name: string;


    expired: Date;

    @IsNotEmpty({ message: 'Details is required' })
    details: string;

    @IsNotEmpty({ message: 'Details is required' })
    assgin: Group
}
