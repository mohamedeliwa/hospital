import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

/**
 * matches a string that is composed only of one digit or more.
 */
export const DIGIT_STRING_REGEX = /^\d+$/g;

export class CreateDecisionDto {
  @ApiProperty({
    type: Number,
    required: true,
    minimum: 1,
    description: 'serial number of the decision',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(DIGIT_STRING_REGEX)
  serialNumber: string;

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
