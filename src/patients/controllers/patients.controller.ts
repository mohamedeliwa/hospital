import { Controller, Get } from '@nestjs/common';
import { PatientsService } from '../services/patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get('describe')
  async describe() {
    return await this.patientsService.describe();
  }
}
