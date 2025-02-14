import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1739502620215 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE User (
        id int NOT NULL AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        permissionId INT NOT NULL,
        FOREIGN KEY (permissionId) REFERENCES Permission(id),
        PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE User;`);
  }
}
