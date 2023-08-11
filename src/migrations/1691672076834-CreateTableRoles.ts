import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
    TableColumn,
    TableForeignKey,
} from "typeorm"

export class CreateTableRoles1691672076834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "roles",
                columns: [
                    {
                        name: "role_id",
                        type: "int",
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "role_name",
                        type: "varchar",
                        isNullable: false,
                        length: '50',
                        isUnique: true

                    },
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("roles")
    }

}
