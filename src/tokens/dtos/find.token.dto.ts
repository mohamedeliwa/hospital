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

export enum AllowedTokenSearchFields {
  value = 'value',
  decisionId = 'decisionId',
  usedAt = 'usedAt',
}

export enum AllowedTokenSortingFields {
  value = 'value',
  decisionId = 'decisionId',
  usedAt = 'usedAt',
}

export enum AllowedTokenSortingValues {
  asc = 'asc',
  desc = 'desc',
}

export class FindTokenDto {
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

  //   @ApiProperty({
  //     enum: AllowedPatientSearchFields,
  //     required: false,
  //     description: 'not exact search',
  //   })
  //   @IsOptional()
  //   @IsNotEmpty()
  //   @IsIn(Object.values(AllowedPatientSearchFields))
  //   searchField?: string;

  //   @ApiProperty({
  //     type: String,
  //     required: false,
  //     description: 'not exact search',
  //   })
  //   @ValidateIf((obj) => Boolean(obj.searchField))
  //   @IsNotEmpty()
  //   searchValue?: string;

  @ApiProperty({
    enum: AllowedTokenSortingFields,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(AllowedTokenSortingFields))
  sortField?: string;

  @ApiProperty({
    enum: AllowedTokenSortingValues,
    required: false,
  })
  @ValidateIf((obj) => Boolean(obj.sortField))
  @IsNotEmpty()
  @IsIn(Object.values(AllowedTokenSortingValues))
  sortValue?: string;

  @ApiProperty({
    required: false,
    type: Number,
    default: 0,
    description: 'number of tokens to skip before fetching',
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
    description: 'number of tokens to return',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
