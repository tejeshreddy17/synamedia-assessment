import { Body, Controller, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { ModifyAppointmentCommand } from "./modify.command";
import { ModifyAppointmentDto } from "./modify.dto";

@Controller("appointment")
export class ModifyAppointmentController {
  constructor(private readonly query: ModifyAppointmentCommand) {}

  /*
   * Use this API to modify an appointment by id
   */
  @Patch(":appointmentId/modify")
  async list(
    @Body() dto: ModifyAppointmentDto,
    @Param("appointmentId", ParseIntPipe) appointmentId: number
  ) {
    return this.query.run(dto, appointmentId);
  }
}
