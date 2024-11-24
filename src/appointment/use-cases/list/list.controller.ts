import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ListAppointmentsByDoctorQuery } from "./list.query";

@Controller("appointment")
export class ListAppointmentsByDoctorController {
  constructor(private readonly query: ListAppointmentsByDoctorQuery) {}

  /*
   * Use this API to view all appointments of consultant doctor
   */
  @Get("consultant-doctor/:consultantDoctorId")
  async list(
    @Param("consultantDoctorId", ParseIntPipe) consultantDoctorId: number
  ) {
    return this.query.run(consultantDoctorId);
  }
}
