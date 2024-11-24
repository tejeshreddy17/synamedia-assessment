import { Controller, Post, Body } from "@nestjs/common";
import { CreateAppointmentDto } from "./create.dto";
import { CreateAppointmentCommand } from "./create.command";

@Controller("appointment")
export class CreateAppointmentController {
  constructor(
    private readonly scheduleAppointmentCommand: CreateAppointmentCommand
  ) {}

  /*
   * Use this API to schedule an appointment.
   */
  @Post()
  async schedule(@Body() dto: CreateAppointmentDto) {
    const appointment = await this.scheduleAppointmentCommand.run(dto);

    return appointment;
  }
}
