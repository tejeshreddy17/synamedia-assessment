import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { AutoRegisterProvider } from "src/common/auto-register-provider.decorator";
import { Appointment } from "src/appointment/entities";

@Injectable()
@AutoRegisterProvider("Appointment")
export class ListAppointmentsByDoctorQuery {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}

  async run(consultantDoctorId: number): Promise<Appointment[]> {
    return await this.appointmentRepository.findBy({ consultantDoctorId });
  }
}
