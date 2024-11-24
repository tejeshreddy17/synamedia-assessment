import { InjectRepository } from "@nestjs/typeorm";
import { Appointment } from "src/appointment/entities";
import { Repository } from "typeorm";
import { CreateAppointmentDto } from "./create.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { AutoRegisterProvider } from "src/common/auto-register-provider.decorator";
import { AppointmentStatus } from "src/appointment/enum";
import { DateTime } from "luxon";

@Injectable()
@AutoRegisterProvider("Appointment")
export class CreateAppointmentCommand {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}

  async run(dto: CreateAppointmentDto): Promise<Appointment> {
    const todaysDate = DateTime.now().toFormat("yyyy-LL-dd");

    if (dto.scheduledDate < todaysDate) {
      throw new BadRequestException(
        `Past date cannot be used for scheduling appointment`
      );
    }

    const appointment = this.appointmentRepository.create({
      ...dto,
    });

    appointment.status = AppointmentStatus.SCHEDULED;

    try {
      return await this.appointmentRepository.save(appointment);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
