import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class CreateRelationship1691675290830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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


    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key for group_id in users table
        await queryRunner.dropForeignKey("users", "FK_users_group_id");

        // Drop foreign key for role_id in users table
        await queryRunner.dropForeignKey("users", "FK_users_role_id");
    }

}
