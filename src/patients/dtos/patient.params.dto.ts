import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class PatientParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  id?: string;
}
