import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertData1691982691847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert roles
<<<<<<< HEAD
        await queryRunner.query(`INSERT INTO roles (role_name) VALUES ('admin')`);
        await queryRunner.query(`INSERT INTO roles (role_name) VALUES ('group admin')`);
        await queryRunner.query(`INSERT INTO roles (role_name) VALUES ('member')`);

        // Insert permissions
        await queryRunner.query(`INSERT INTO permissions (permission_name) VALUES ('create_member')`);
        await queryRunner.query(`INSERT INTO permissions (permission_name) VALUES ('update_member')`);
        await queryRunner.query(`INSERT INTO permissions (permission_name) VALUES ('delete_member')`);
        await queryRunner.query(`INSERT INTO permissions (permission_name) VALUES ('view_member')`);
        await queryRunner.query(`INSERT INTO permissions (permission_name) VALUES ('assign_member_to_group')`);
        await queryRunner.query(`INSERT INTO permissions (permission_name) VALUES ('create_group')`);
        await queryRunner.query(`INSERT INTO permissions (permission_name) VALUES ('update_group')`);
        await queryRunner.query(`INSERT INTO permissions (permission_name) VALUES ('delete_group')`);
        await queryRunner.query(`INSERT INTO permissions (permission_name) VALUES ('view_group')`);


        // Insert role_permission pairs
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 1)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 2)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 3)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 4)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 5)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 6)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 7)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 8)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 9)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (2, 1)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (2, 2)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (2, 3)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (2, 4)`);
        await queryRunner.query(`INSERT INTO roles_permissions (role_id, permission_id) VALUES (2, 5)`);
=======
        await queryRunner.query(`INSERT INTO \`roles\` (role_name) VALUES ('admin')`);
        await queryRunner.query(`INSERT INTO \`roles\` (role_name) VALUES ('group admin')`);
        await queryRunner.query(`INSERT INTO \`roles\` (role_name) VALUES ('member')`);

        // Insert permissions
        await queryRunner.query(`INSERT INTO \`permissions\` (permission_name) VALUES ('create_member')`);
        await queryRunner.query(`INSERT INTO \`permissions\` (permission_name) VALUES ('update_member')`);
        await queryRunner.query(`INSERT INTO \`permissions\` (permission_name) VALUES ('delete_member')`);
        await queryRunner.query(`INSERT INTO \`permissions\` (permission_name) VALUES ('view_member')`);
        await queryRunner.query(`INSERT INTO \`permissions\` (permission_name) VALUES ('assign_member_to_group')`);
        await queryRunner.query(`INSERT INTO \`permissions\` (permission_name) VALUES ('create_group')`);
        await queryRunner.query(`INSERT INTO \`permissions\` (permission_name) VALUES ('update_group')`);
        await queryRunner.query(`INSERT INTO \`permissions\` (permission_name) VALUES ('delete_group')`);
        await queryRunner.query(`INSERT INTO \`permissions\` (permission_name) VALUES ('view_group')`);


        // Insert role_permission pairs
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (1, 1)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (1, 2)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (1, 3)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (1, 4)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (1, 5)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (1, 6)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (1, 7)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (1, 8)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (1, 9)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (2, 1)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (2, 2)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (2, 3)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (2, 4)`);
        await queryRunner.query(`INSERT INTO \`roles_permissions\` (role_id, permission_id) VALUES (2, 5)`);
>>>>>>> master


        //Inser User
        await queryRunner.query(`
<<<<<<< HEAD
                    INSERT INTO users (
=======
                    INSERT INTO \`users\` (
>>>>>>> master
                        user_id, name, email, password, gender, birthday, last_login,
                        created_at, created_by, updated_by, deleted_at, updated_at, group_id, role_id
                    ) VALUES (
                        '1', 'Admin', 'Admin@gmail.com', '$2b$10$9xMrfyGz6euLjOhpSov5yOr0kifPKXQTobLbaYlzxAzkP8dFBpAlq', '1', '2001-08-29', '2023-08-10 21:35:23.000000', '2023-08-10 21:23:07.000000', '1', NULL, NULL, NULL, NULL, '1'
                    )
                `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete user
        await queryRunner.query(`DELETE FROM users WHERE id = '1'`);

        // Delete role_permission pairs
        await queryRunner.query(`DELETE FROM roles_permissions WHERE role_id IN (1, 2)`);

        // Delete permissions
        await queryRunner.query(`DELETE FROM permissions WHERE permission_name IN (
        'create_member', 'update_member', 'delete_member', 'view_member', 'assign_member_to_group',
        'create_group', 'update_group', 'delete_group', 'view_group'
        )`);

        // Delete roles
        await queryRunner.query(`DELETE FROM roles WHERE role_name IN ('admin', 'group admin', 'member')`);
    }

}
