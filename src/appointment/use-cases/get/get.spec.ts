import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { GetAppointmentQuery } from "./get.query";
import { Appointment } from "src/appointment/entities";

jest.mock("typeorm-transactional", () => ({
  initializeTransactionalContext: jest.fn(),
  Transactional: () => () => ({}),
}));

describe("GetAppointmentQuery", () => {
  let query: GetAppointmentQuery;
  const mockAppointmentRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAppointmentQuery,
        {
          provide: getRepositoryToken(Appointment),
          useValue: mockAppointmentRepository,
        },
      ],
    }).compile();

    query = module.get<GetAppointmentQuery>(GetAppointmentQuery);
  });

  it("should be defined", () => {
    expect(query).toBeDefined();
  });

  it("should find an existing appointment cancel reason", async () => {
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

    mockAppointmentRepository.findOneBy.mockResolvedValue(existingAppointment);

    const found = await query.run(existingAppointment.id);

    expect(found).toEqual(existingAppointment);

    expect(mockAppointmentRepository.findOneBy).toHaveBeenCalledWith({
      id: existingAppointment.id,
    });
  });

  it("should throw NotFoundException when appointment cancel reason is not found", async () => {
    const nonExistentId = 999;
    const customerId = 1;

    mockAppointmentRepository.findOneBy.mockResolvedValue(null);

    await expect(query.run(nonExistentId)).rejects.toThrowError(
      NotFoundException
    );
  });
});
