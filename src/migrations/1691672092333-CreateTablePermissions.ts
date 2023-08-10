import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
    TableColumn,
    TableForeignKey,
} from "typeorm"

export class CreateTablePermissions1691672092333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "permissions",
                columns: [
                    {
                        name: "permission_id",
                        type: "int",
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "permission_name",
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
        // const table = await queryRunner.getTable("permissions")
    }

}
