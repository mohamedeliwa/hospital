import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PatientsService } from '../services/patients.service';
import { CreatePatientDto } from '../dtos/create.patient.dto';
import { Patient } from '@prisma/client';
import { ApiParam } from '@nestjs/swagger';
import { PatientParamsDto } from '../dtos/patient.params.dto';
import { FindPatientDto } from '../dtos/find.patient.dto';
import { UpdatePatientDto } from '../dtos/update.patient.dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    forbidUnknownValues: true,
  }),
)
@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get('describe')
  async describe() {
    return await this.patientsService.describe();
  }

  @Post()
  async create(@Body() patient: CreatePatientDto): Promise<Patient> {
    return await this.patientsService.create(patient);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the patient to be returned',
  })
  @Get(':id')
  async findOne(@Param() { id }: PatientParamsDto): Promise<Patient> {
    return await this.patientsService.findOne(id);
  }

  @ApiParam({
    name: ':id',
    required: true,
    description: 'id of the patient to be updated',
  })
  @Patch(':id')
  async update(
    @Param() { id }: PatientParamsDto,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return await this.patientsService.update(id, updatePatientDto);
  }
}
