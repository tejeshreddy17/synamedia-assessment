import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableDoctorsAndTimeSlots1732429417469
  implements MigrationInterface
{
  name = "AddTableDoctorsAndTimeSlots1732429417469";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`consultant_doctors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`appointment_time_slots\` (\`id\` int NOT NULL AUTO_INCREMENT, \`begins_at\` time NOT NULL, \`ends_at\` time NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`appointments\` DROP COLUMN \`national_identifier\``
    );
    await queryRunner.query(
      `ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_65b915b073a909d2daf1e04e3e9\` FOREIGN KEY (\`consultant_doctor_id\`) REFERENCES \`consultant_doctors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    await queryRunner.query(
      `insert into consultant_doctors (first_name,last_name,created_at) values('john','doe',now())`
    );

    await queryRunner.query(
      `insert into consultant_doctors (first_name,last_name,created_at) values('mary','jane',now())`
    );

    await queryRunner.query(
      `insert into appointment_time_slots (begins_at,ends_at,created_at) values('10:00','11:00',now())`
    );

    await queryRunner.query(
      `insert into appointment_time_slots (begins_at,ends_at,created_at) values('11:00','12:00',now())`
    );

    await queryRunner.query(
      `insert into appointment_time_slots (begins_at,ends_at,created_at) values('13:00','14:00',now())`
    );

    await queryRunner.query(
      `insert into appointment_time_slots (begins_at,ends_at,created_at) values('14:00','15:00',now())`
    );

    await queryRunner.query(
      `insert into appointment_time_slots (begins_at,ends_at,created_at) values('15:00','16:00',now())`
    );

    await queryRunner.query(
      `insert into appointment_time_slots (begins_at,ends_at,created_at) values('16:00','17:00',now())`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_65b915b073a909d2daf1e04e3e9\``
    );
    await queryRunner.query(
      `ALTER TABLE \`appointments\` ADD \`national_identifier\` varchar(255) NULL`
    );
    await queryRunner.query(`DROP TABLE \`appointment_time_slots\``);
    await queryRunner.query(`DROP TABLE \`consultant_doctors\``);
  }
}
