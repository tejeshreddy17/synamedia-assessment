import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Appointment } from "src/appointment/entities";
import { ListAppointmentsByDoctorQuery } from "./list.query";

jest.mock("typeorm-transactional", () => ({
  initializeTransactionalContext: jest.fn(),
  Transactional: () => () => ({}),
}));

describe("ListAppointmentsByDoctorQuery", () => {
  let query: ListAppointmentsByDoctorQuery;
  const mockAppointmentRepository = {
    findBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListAppointmentsByDoctorQuery,
        {
          provide: getRepositoryToken(Appointment),
          useValue: mockAppointmentRepository,
        },
      ],
    }).compile();

    query = module.get<ListAppointmentsByDoctorQuery>(
      ListAppointmentsByDoctorQuery
    );
  });

  it("should be defined", () => {
    expect(query).toBeDefined();
  });

  it("should find an list of appointments for doctor", async () => {
    const existingAppointment = {
      firstName: "John",
      lastName: "Smith",
      dialingCode: "91",
      mobile: "9980664411",
      gender: "Female",
      email: "patient@mailinator.com",
      scheduledDate: "2024-12-15",
      appointmentTimeSlotId: 1,
      consultantDoctorId: 1,
      status: "Scheduled",
      createdAt: "2024-11-24T07:25:23.663Z",
      updatedAt: "2024-11-24T07:25:23.663Z",
      id: 1,
    };

    mockAppointmentRepository.findBy.mockResolvedValue([existingAppointment]);

    const found = await query.run(existingAppointment.id);

    expect(found).toEqual([existingAppointment]);

    expect(mockAppointmentRepository.findBy).toHaveBeenCalledWith({
      consultantDoctorId: existingAppointment.consultantDoctorId,
    });
  });
});
