import { MigrationInterface, QueryRunner } from "typeorm"

export class InserData21692339411345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        //Inser Groups
        await queryRunner.query(`
                    INSERT INTO groups (
                        group_id , name, group_admin_id , created_at, created_by, updated_by, deleted_at, updated_at)
                    VALUES (
                        '1', 'abc', '1', '2023-08-18 10:10:00.371000', '1', NULL, NULL, NULL
                    )`);

        await queryRunner.query(`
                    INSERT INTO groups (
                        group_id , name, group_admin_id , created_at, created_by, updated_by, deleted_at,updated_at)
                    VALUES (
                        '2', 'abcd', '2', '2023-08-18 10:10:01.371000', '1', NULL, NULL, NULL
                    )`);

        await queryRunner.query(`
                    INSERT INTO groups (
                        group_id , name, group_admin_id , created_at, created_by, updated_by, deleted_at,updated_at)
                    VALUES (
                        '3', 'abcde', '3', '2023-08-18 10:10:02.371000', '1', NULL, NULL, NULL
                    )`);


        //Insert Vouchers

        await queryRunner.query(`
                    INSERT INTO vouchers (
                        voucher_id,image , name, expired_date, detail , created_at, created_by, updated_by, deleted_at,updated_at)
                    VALUES (
                        '1', 'upload\TienDo1.png', 'birthday ', '2023-08-30 00:00:00.000000',  'abc', '2023-08-18 13:10:06.073000', 1, NULL, NULL, NULL
                    )`);

        await queryRunner.query(`
                    INSERT INTO vouchers (
                        voucher_id,image , name, expired_date, detail , created_at, created_by, updated_by, deleted_at,updated_at)
                    VALUES (
                        '2', 'upload\TienDo2.png', 'birthday ', '2023-08-30 00:00:00.000000',  'abc', '2023-08-18 13:10:06.073000', 1, NULL, NULL, NULL
                    )`);


        //inset groups_vouchers
        await queryRunner.query(`INSERT INTO groups_vouchers (group_id, voucher_id) VALUES (1, 1)`);
        await queryRunner.query(`INSERT INTO groups_vouchers (group_id, voucher_id) VALUES (1, 2)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE groups_vouchers`);
        await queryRunner.query(`DROP TABLE vouchers`);
        await queryRunner.query(`DROP TABLE groups`);
    }

}
