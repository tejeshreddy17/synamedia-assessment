import { Transform } from "class-transformer";
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";
import { Gender } from "src/appointment/enum";

export class CreateAppointmentDto {
  /*
   * First name of the patient
   * @example 'John'
   */
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /*
   * Last name of the patient
   * @example 'Smith'
   */
  @IsString()
  @IsNotEmpty()
  lastName: string;

  /*
   * Country code of the mobile number
   * @example '91'
   */
  @IsNumberString()
  @Transform(({ value }) => value?.trim())
  dialingCode: string;

  /*
   * Mobile number of the patient
   * @example '9980664411'
   */
  @IsNumberString()
  mobile: string;

  /*
   * Email address of the patient
   * @example 'patient@mailinator.com'
   */
  @IsOptional()
  @IsEmail()
  email?: string;

  /*
   * Gender of the patient
   * @example Female
   */
  @IsEnum(Gender)
  gender: Gender;

  /*
   * Date of the appointment
   * @example '2022-12-15'
   */
  @IsDateString()
  scheduledDate: string;

  /*
   * Timeslot id for the appointment
   * @example 1
   */
  @IsInt()
  appointmentTimeSlotId: number;

  /*
   * Consultant doctor id for the appointment
   * @example 1
   */
  @IsInt()
  consultantDoctorId: number;
}
