import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateDecisionDto {
  @ApiProperty({
    type: Number,
    required: true,
    minimum: 1,
    description: 'serial number of the decision',
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  serialNumber: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'id of the patient who owns the decision',
  })
  @IsNotEmpty()
  @IsUUID()
  patientId: string;

  @ApiProperty({
    type: Date,
    required: true,
    description: 'date at which the decision is taken',
  })
  @IsNotEmpty()
  @IsDateString()
  issuedAt: string;

  @ApiProperty({
    type: Date,
    required: true,
    description: 'date at which the decision expires',
  })
  @IsNotEmpty()
  @IsDateString()
  expirationDate: string;
}
