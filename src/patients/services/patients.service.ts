import { Injectable } from '@nestjs/common';
import { Patient, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AllowedPatientSortingFields,
  AllowedUserSortingValues,
  FindPatientDto,
} from '../dtos/find.patient.dto';
import { UpdatePatientDto } from '../dtos/update.patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  /**
   * @returns the description of the patient model
   */
  async describe() {
    return this.prisma.patient.fields;
  }

  /**
   * creates a new patient
   * @param createPatientDto patient's data to be created
   * @returns the newly created patient object
   */
  async create(createPatientDto: Prisma.PatientCreateInput): Promise<Patient> {
    const patient = this.prisma.patient.create({ data: createPatientDto });
    return patient;
  }

  /**
   * finds a patient by id
   * @param id - patient's id to find
   * @returns the found patient's object
   */
  async findOne(id: string): Promise<Patient> {
    const patient = await this.prisma.patient.findUniqueOrThrow({
      where: { id },
    });
    return patient;
  }

  /**
   * finds multiple patients
   * @param findPatientDto - patients' data to find
   * @returns an array of the found patients
   */
  async find(findPatientDto: FindPatientDto): Promise<Patient[]> {
    // TODO: add fuzzy finding feature, or searching with non exact matching
    const { skip, limit, sortField, sortValue, ...matches } = findPatientDto;

    const patients = await this.prisma.patient.findMany({
      where: matches,
      skip,
      orderBy: {
        [sortField || AllowedPatientSortingFields.name]:
          sortValue || AllowedUserSortingValues.asc,
      },
      take: limit,
    });
    return patients;
  }

  /**
   * updates patient data by id
   * @param id - patient's id to be updated
   * @param updatePatientDto - patient's data to be updated
   * @returns the updated patient object
   */
  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const patient = this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
    });

    return patient;
  }

  /**
   * deletes a patient by id
   * @param id - id of the patient to delete
   * @returns the deleted patient's object
   */
  async delete(id: string): Promise<Patient> {
    const patient = await this.prisma.patient.delete({
      where: { id },
    });

    return patient;
  }
}
