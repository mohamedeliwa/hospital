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
}
