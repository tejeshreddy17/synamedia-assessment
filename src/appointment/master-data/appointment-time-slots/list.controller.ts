import { Controller, Get } from "@nestjs/common";
import { ListAppointmentTimeSlotsQuery } from "./list.query";

@Controller("appointment-time-slots")
export class ListAppointmentTimeSlotsController {
  constructor(private readonly query: ListAppointmentTimeSlotsQuery) {}

  /*
   * Use this API to view all appointment time slots
   */
  @Get()
  async list() {
    return this.query.run();
  }
}
