import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertPermissions1739503268697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      INSERT INTO Permission (nome) VALUES ('admin'), ('operador');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      DELETE FROM Permission;
    `);
  }
}
