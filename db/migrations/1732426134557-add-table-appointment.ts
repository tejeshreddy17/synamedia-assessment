import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableAppointment1732426134557 implements MigrationInterface {
  name = "AddTableAppointment1732426134557";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`appointments\` (\`id\` int NOT NULL AUTO_INCREMENT,  \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NULL, \`dialing_code\` varchar(10) NOT NULL DEFAULT '91', \`mobile\` varchar(255) NOT NULL, \`gender\` enum ('Male', 'Female') NULL, \`email\` varchar(64) NULL, \`national_identifier\` varchar(255) NULL, \`scheduled_date\` date NOT NULL, \`appointment_time_slot_id\` int NULL, \`consultant_doctor_id\` int NOT NULL, \`status\` enum ('Scheduled', 'Cancelled', 'Modified', 'Rescheduled') NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`appointments\``);
  }
}
