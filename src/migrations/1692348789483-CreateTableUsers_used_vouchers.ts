import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableUsersUsedVouchers1692348789483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_used_vouchers",
                columns: [
                    {
                        name: "user_id",
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
                        columnNames: ["user_id"],
                        referencedColumnNames: ["user_id"],
                        referencedTableName: "users",
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
        await queryRunner.dropTable("users_used_vouchers")
    }

}
