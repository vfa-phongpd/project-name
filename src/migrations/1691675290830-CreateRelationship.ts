import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class CreateRelationship1691675290830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


        // await queryRunner.addColumn(
        //     "users",
        //     new TableColumn({
        //         name: "role_id",
        //         type: "int",
        //     }),
        // )


        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                columnNames: ["group_id"],
                referencedColumnNames: ["group_id"],
                referencedTableName: "groups",
                onDelete: "CASCADE",
            }),
        )


        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                columnNames: ["role_id"],
                referencedColumnNames: ["role_id"],
                referencedTableName: "roles",
                onDelete: "CASCADE",
            }),
        )

        // await queryRunner.createForeignKey(
        //     "permissions",
        //     new TableForeignKey({
        //         columnNames: ["permission_id"],
        //         referencedColumnNames: ["permissions_id"],
        //         referencedTableName: "role_permissions",
        //         onDelete: "CASCADE",
        //     }),
        // )


        // await queryRunner.createForeignKey(
        //     "roles",
        //     new TableForeignKey({
        //         columnNames: ["role_id"],
        //         referencedColumnNames: ["role_id"],
        //         referencedTableName: "role_permissions",
        //         onDelete: "CASCADE",
        //     }),
        // )




    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
