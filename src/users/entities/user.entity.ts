// import { Group } from 'src/groups/entities/group.entity';
// import { Role } from 'src/roles/entities/role.entity';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Group } from 'src/groups/entities/group.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, Unique, OneToMany, ManyToOne } from 'typeorm';



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ message: 'Name can not be null or empty' })
    @Column({ type: 'varchar', length: 50, nullable: false, name: 'name' })
    name: string;

    @IsEmail({}, { message: 'Email is not valid' })
    @IsNotEmpty({ message: 'Email can not be null or empty' })
    @MaxLength(255, { message: 'The length must be less than 255 characters' })
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;


    @Exclude()
    @IsNotEmpty({ message: 'Password can not be null or empty' })
    @MaxLength(255, { message: 'The length must be less than 255 characters' })
    @Column({ type: 'varchar', nullable: false })
    password: string;

    @IsNotEmpty({ message: 'gender can not be null or empty' })
    @Column({ name: 'gender', nullable: false, default: 0 })
    gender: Boolean;

    @Column({ type: 'datetime', name: 'rent_date', nullable: false })
    birthday: Date;

    @Column({ type: 'timestamp', name: 'rent_date', nullable: true })
    last_login: Date;


    @ManyToOne(() => Role, (Role) => Role.users)
    role: Role

    @OneToOne(() => Group)
    @JoinColumn()
    group: Group;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'int', nullable: true })
    created_by: Number;

    @Column({ type: 'int', nullable: true })
    updated_by: Number;

    @Column({ type: 'datetime', default: null, nullable: true })
    deleted_at: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at: Date;

}


