import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AppointmentStatus, Gender } from "../enum";
import { ConsultantDoctor } from "./consultant-doctor.entity";
import { AppointmentTimeSlot } from "./appointment-time-slot.entity";

@Entity("appointments", { schema: "synamedia" })
export class Appointment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255, nullable: true })
  lastName: string | null;

  @Column("varchar", {
    name: "dialing_code",
    length: 10,
    default: "91",
  })
  dialingCode: string;

  @Column("varchar", { name: "mobile", length: 255 })
  mobile: string;

  @Column({
    type: "enum",
    name: "gender",
    enum: Gender,
    nullable: true,
  })
  gender: Gender | null;

  @Column("varchar", { name: "email", length: 64, nullable: true })
  email: string | null;

  @Column("date", { name: "scheduled_date" })
  scheduledDate: string;

  @Column("int", { name: "appointment_time_slot_id", nullable: true })
  appointmentTimeSlotId?: number | null;

  @Column("int", { name: "consultant_doctor_id" })
  consultantDoctorId: number;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
  })
  status: AppointmentStatus;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("datetime", { name: "updated_at" })
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

  @ManyToOne(() => ConsultantDoctor)
  @JoinColumn({ name: "consultant_doctor_id", referencedColumnName: "id" })
  consultantDoctot: ConsultantDoctor;

  @ManyToOne(() => AppointmentTimeSlot)
  @JoinColumn([
    { name: "appointment_time_slot_id", referencedColumnName: "id" },
  ])
  appointmentTimeSlot: AppointmentTimeSlot;
}
