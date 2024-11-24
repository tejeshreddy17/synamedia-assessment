import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { AutoRegisterProvider } from "src/common/auto-register-provider.decorator";
import { Appointment } from "src/appointment/entities";

@Injectable()
@AutoRegisterProvider("Appointment")
export class GetAppointmentQuery {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}

  async run(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ id });

    if (appointment === null) {
      throw new NotFoundException(`Appointment with id ${id} is not found`);
    }

    return appointment;
  }
}
