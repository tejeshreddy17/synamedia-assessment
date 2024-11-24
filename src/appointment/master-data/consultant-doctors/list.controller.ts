import { Controller, Get } from "@nestjs/common";
import { ListDoctorsQuery } from "./list.query";

@Controller("consultant-doctors")
export class ListDoctorsController {
  constructor(private readonly query: ListDoctorsQuery) {}

  /*
   * Use this API to view all consultant doctors
   */
  @Get()
  async list() {
    return this.query.run();
  }
}
