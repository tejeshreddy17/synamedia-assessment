import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { AutoRegisterProvider } from "src/common/auto-register-provider.decorator";
import { AppointmentTimeSlot } from "src/appointment/entities/appointment-time-slot.entity";

@Injectable()
@AutoRegisterProvider("Appointment")
export class ListAppointmentTimeSlotsQuery {
  constructor(
    @InjectRepository(AppointmentTimeSlot)
    private appointmentTimeSlotRepository: Repository<AppointmentTimeSlot>
  ) {}

  async run() {
    return await this.appointmentTimeSlotRepository.find();
  }
}
