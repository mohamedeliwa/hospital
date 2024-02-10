import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class UpdateDecisionDto {
  @ApiProperty({
    type: Number,
    required: false,
    minimum: 1,
    description: 'serial number of the decision',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  serialNumber?: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'id of the patient who owns the decision',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  patientId?: string;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'date at which the decision is taken',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  issuedAt?: string;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'date at which the decision expires',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  expirationDate?: string;
}
