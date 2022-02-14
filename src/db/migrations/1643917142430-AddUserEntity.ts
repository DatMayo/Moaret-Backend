import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserEntity1643917142430 implements MigrationInterface {
    name = 'AddUserEntity1643917142430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`db_user\` (\`createdAt\` int(11) NOT NULL DEFAULT 0, \`updatedAt\` int(11) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`mail\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`db_user\``);
    }

}
