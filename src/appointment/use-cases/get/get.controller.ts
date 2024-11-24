import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { GetAppointmentQuery } from "./get.query";

@Controller("appointment")
export class GetAppointmentCommand {
  constructor(private readonly query: GetAppointmentQuery) {}

  /*
   * Use this API to view  appointment by id
   */
  @Get(":appointmentId")
  async list(@Param("appointmentId", ParseIntPipe) appointmentId: number) {
    return this.query.run(appointmentId);
  }
}
