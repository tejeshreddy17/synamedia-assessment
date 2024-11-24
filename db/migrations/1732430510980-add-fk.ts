import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFk1732430510980 implements MigrationInterface {
  name = "AddFk1732430510980";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_ac5ec437d6733a142c2f7496a74\` FOREIGN KEY (\`appointment_time_slot_id\`) REFERENCES \`appointment_time_slots\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_ac5ec437d6733a142c2f7496a74\``
    );
  }
}
