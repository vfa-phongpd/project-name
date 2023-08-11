import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableRolePermissions1691674449929 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "roles_permissions", // Tên bảng trung gian
                columns: [
                    {
                        name: "role_id",
                        type: "int",
                        isNullable: false,
                        isPrimary: true,
                    },
                    {
                        name: "permission_id",
                        type: "int",
                        isNullable: false,
                        isPrimary: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["role_id"],
                        referencedColumnNames: ["role_id"],
                        referencedTableName: "roles",
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["permission_id"],
                        referencedColumnNames: ["permission_id"],
                        referencedTableName: "permissions",
                        onDelete: "CASCADE",
                    },
                ],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("roles_permissions")


        const table = await queryRunner.getTable("roles_permissions")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("role_id") !== -1,
        )
        await queryRunner.dropForeignKey("roles_permissions", foreignKey)


        const foreignKey2 = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("permission_id") !== -1,
        )
        await queryRunner.dropForeignKey("roles_permissions", foreignKey2)
    }

}
