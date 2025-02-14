import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePermission1739502384129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE Permission (
        id int NOT NULL AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE Permission;`);
  }
}
