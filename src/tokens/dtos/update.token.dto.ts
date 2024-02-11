import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  // Min,
} from 'class-validator';

export class UpdateTokenDto {
  @ApiProperty({
    type: Number,
    required: false,
    description: 'value of the token',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  // @Min(0)
  @IsPositive()
  value?: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'id of the decision that holds the token',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  decisionId?: string;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'date at which the token is used',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  usedAt?: string;
}
