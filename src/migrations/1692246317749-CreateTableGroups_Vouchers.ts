import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableGroupsVouchers1692246317749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "groups_vouchers",
                columns: [
                    {
                        name: "group_id",
                        type: "int",
                        isNullable: false,
                        isPrimary: true,
                    },
                    {
                        name: "voucher_id",
                        type: "int",
                        isNullable: false,
                        isPrimary: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["group_id"],
                        referencedColumnNames: ["group_id"],
                        referencedTableName: "groups",
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["voucher_id"],
                        referencedColumnNames: ["voucher_id"],
                        referencedTableName: "vouchers",
                        onDelete: "CASCADE",
                    },
                ],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("groups_vouchers")
    }

}
