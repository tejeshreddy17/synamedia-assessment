import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { AutoRegisterProvider } from "src/common/auto-register-provider.decorator";
import { AppointmentTimeSlot } from "src/appointment/entities/appointment-time-slot.entity";
import { ConsultantDoctor } from "src/appointment/entities/consultant-doctor.entity";

@Injectable()
@AutoRegisterProvider("Appointment")
export class ListDoctorsQuery {
  constructor(
    @InjectRepository(ConsultantDoctor)
    private consultantDoctorsRepository: Repository<ConsultantDoctor>
  ) {}

  async run() {
    return await this.consultantDoctorsRepository.find();
  }
}
