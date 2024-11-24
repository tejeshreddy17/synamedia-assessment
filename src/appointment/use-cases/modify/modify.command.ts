import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AutoRegisterProvider } from "src/common/auto-register-provider.decorator";
import { Appointment } from "src/appointment/entities";
import { ModifyAppointmentDto } from "./modify.dto";
import { AppointmentStatus } from "src/appointment/enum";

@Injectable()
@AutoRegisterProvider("Appointment")
export class ModifyAppointmentCommand {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}

  async run(dto: ModifyAppointmentDto, id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({
      id,
      status: AppointmentStatus.SCHEDULED,
    });

    if (appointment === null) {
      throw new NotFoundException(`Appointment with id ${id} is not found`);
    }

    this.appointmentRepository.merge(appointment, {
      email: dto.email,
      appointmentTimeSlotId: dto.newAppointmentTimeSlotId,
      status: AppointmentStatus.RESCHEDULED,
    });

    try {
      return await this.appointmentRepository.save(appointment);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
