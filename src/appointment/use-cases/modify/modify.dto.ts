import { IsEmail, IsInt } from "class-validator";

export class ModifyAppointmentDto {
  /*
   * Email address of the patient
   * @example 'patient@mailinator.com'
   */
  @IsEmail()
  email?: string;

  /*
   * original Timeslot id for the appointment
   * @example 1
   */
  @IsInt()
  originalAppointmentTimeSlotId: number;

  /*
   * new Timeslot id for the appointment
   * @example 2
   */
  @IsInt()
  newAppointmentTimeSlotId: number;
}
