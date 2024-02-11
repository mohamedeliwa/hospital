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

export class CreateTokenDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'value of the token',
  })
  @IsNotEmpty()
  @IsNumber()
  // @Min(0)
  @IsPositive()
  value: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'id of the decision that holds the token',
  })
  @IsNotEmpty()
  @IsUUID()
  decisionId: string;

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
