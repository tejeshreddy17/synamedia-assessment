import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateAppointmentCommand } from "./create.command";
import { Appointment } from "src/appointment/entities";
import { CreateAppointmentDto } from "./create.dto";
import { AppointmentStatus, Gender } from "src/appointment/enum";

jest.mock("typeorm-transactional", () => ({
  initializeTransactionalContext: jest.fn(),
  Transactional: () => () => ({}),
}));

describe("create_appointment_command", () => {
  let command: CreateAppointmentCommand;

  const mockAppointmentRepository = {
    create: jest.fn((dto) => dto),
    save: jest.fn((dto) => Promise.resolve({ ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAppointmentCommand,
        {
          provide: getRepositoryToken(Appointment),
          useValue: mockAppointmentRepository,
        },
      ],
    }).compile();

    command = module.get<CreateAppointmentCommand>(CreateAppointmentCommand);
  });

  it("should be defined", () => {
    expect(command).toBeDefined();
  });

  it("should create an appointment", async () => {
    const appointmentDto: CreateAppointmentDto = {
      firstName: "John",
      lastName: "Smith",
      dialingCode: "91",
      mobile: "9980664411",
      email: "patient@mailinator.com",
      gender: Gender.MALE,
      scheduledDate: "2024-12-15",
      appointmentTimeSlotId: 1,
      consultantDoctorId: 1,
    };

    expect(await command.run(appointmentDto)).toEqual({
      firstName: "John",
      lastName: "Smith",
      dialingCode: "91",
      mobile: "9980664411",
      email: "patient@mailinator.com",
      gender: Gender.MALE,
      scheduledDate: "2024-12-15",
      appointmentTimeSlotId: 1,
      consultantDoctorId: 1,
      status: AppointmentStatus.SCHEDULED,
    });
  });
});
