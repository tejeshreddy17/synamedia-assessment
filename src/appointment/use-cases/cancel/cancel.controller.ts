import { Controller, Get, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { CancelAppointmentCommand } from "./cancel.command";

@Controller("appointment")
export class CancelAppointmentController {
  constructor(private readonly query: CancelAppointmentCommand) {}

  /*
   * Use this API to cancel an appointment by id
   */
  @Patch(":appointmentId/cancel")
  async list(@Param("appointmentId", ParseIntPipe) appointmentId: number) {
    return this.query.run(appointmentId);
  }
}
