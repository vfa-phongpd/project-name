import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
    TableColumn,
    TableForeignKey,
} from "typeorm"

export class CreateTableGroups1691672058353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "groups",
                columns: [
                    {
                        name: "group_id",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // const table = await queryRunner.getTable("groups")
        await queryRunner.dropTable("groups")
    }

}
