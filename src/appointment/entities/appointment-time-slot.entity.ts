import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("appointment_time_slots", { schema: "synamedia" })
export class AppointmentTimeSlot {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("time", { name: "begins_at" })
  beginsAt: string;

  @Column("time", { name: "ends_at" })
  endsAt: string;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date;

  @BeforeInsert()
  setDatesBeforeInsert() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  setDateBeforeUpdate() {
    this.updatedAt = new Date();
  }
}
