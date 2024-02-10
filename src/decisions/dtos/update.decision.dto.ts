import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { DIGIT_STRING_REGEX } from './create.decision.dto';

export class UpdateDecisionDto {
  @ApiProperty({
    type: Number,
    required: false,
    minimum: 1,
    description: 'serial number of the decision',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(DIGIT_STRING_REGEX)
  serialNumber?: string;

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
