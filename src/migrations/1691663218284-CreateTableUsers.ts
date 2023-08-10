import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
    TableColumn,
    TableForeignKey,
} from "typeorm"

export class CreateTableUsers1691663218284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                        length: '50'

                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        length: '50',
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                        isNullable: false,

                    },
                    {
                        name: "gender",
                        type: "tinyint",
                        isNullable: false,
                    },
                    {
                        name: "birthday",
                        type: "DATE",
                        isNullable: false,

                    },
                    {
                        name: "last_login",
                        type: "DATETIME(6)",
                        isNullable: true,

                    },
                    {
                        name: "created_at",
                        type: "DATETIME(6)",
                        isNullable: false,

                    },
                    {
                        name: "created_by",
                        type: "INT",
                        isNullable: false,

                    },
                    {
                        name: "updated_by",
                        type: "INT",
                        isNullable: true,


                    },
                    {
                        name: "deleted_at",
                        type: "DATETIME(6)",
                        isNullable: true,


                    },
                    {
                        name: "updated_at",
                        type: "DATETIME(6)",
                        isNullable: true,


                    },
                ],
            }),
            true,
        )
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "group_id",
                type: "int",
                isNullable: true,
            }),
        )
            ,
            await queryRunner.addColumn(
                "users",
                new TableColumn({
                    name: "role_id",
                    type: "int",
                }),
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
