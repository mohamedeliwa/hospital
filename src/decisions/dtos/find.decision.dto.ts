import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';

export enum AllowedDecisionSortingFields {
  serialNumber = 'serialNumber',
  patientId = 'patientId',
  issuedAt = 'issuedAt',
  expirationDate = 'expirationDate',
}

export enum AllowedDecisionSortingValues {
  asc = 'asc',
  desc = 'desc',
}

export class FindDecisionDto {
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

  @ApiProperty({
    enum: AllowedDecisionSortingFields,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(AllowedDecisionSortingFields))
  sortField?: string;

  @ApiProperty({
    enum: AllowedDecisionSortingValues,
    required: false,
  })
  @ValidateIf((obj) => Boolean(obj.sortField))
  @IsNotEmpty()
  @IsIn(Object.values(AllowedDecisionSortingValues))
  sortValue?: string;

  @ApiProperty({
    required: false,
    type: Number,
    default: 0,
    description: 'number of decisions to skip before fetching',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  skip?: number = 0;

  @ApiProperty({
    required: false,
    type: Number,
    minimum: 1,
    default: 10,
    description: 'number of decisions to return',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
