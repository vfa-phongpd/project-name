import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableVouchers1692244934122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vouchers",
                columns: [
                    {
                        name: "voucher_id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },

                    {
                        name: "image",
                        type: "varchar(255)",
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: "name",
                        type: "varchar(255)",
                        isNullable: false,

                    },
                    {
                        name: "expired_date",
                        type: "DATETIME(6)",
                        isNullable: false
                    },

                    {
                        name: "detail",
                        type: "Text",
                        isNullable: false,
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
        await queryRunner.dropTable("vouchers")
    }

}
