import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Appointment } from "./entities";
import * as controllers from "./index.controllers";
import { registeredProvidersForModule } from "src/common/auto-registered-providers";
import { AppointmentTimeSlot } from "./entities/appointment-time-slot.entity";
import { ConsultantDoctor } from "./entities/consultant-doctor.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      AppointmentTimeSlot,
      ConsultantDoctor,
    ]),
  ],
  controllers: [...Object.values(controllers)],
  providers: [...registeredProvidersForModule("Appointment")],
})
export class AppointmentModule {}
