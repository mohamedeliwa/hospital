import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

export enum AllowedPatientSearchFields {
  name = 'name',
  nationalId = 'nationalId',
  phone = 'phone',
}

export enum AllowedPatientSortingFields {
  name = 'name',
  nationalId = 'nationalId',
  phone = 'phone',
}

export enum AllowedUserSortingValues {
  asc = 'asc',
  desc = 'desc',
}

export class FindPatientDto {
  @ApiProperty({
    type: String,
    required: false,
    minLength: 3,
    maxLength: 50,
    description: 'name of the patient, exact search',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'national ID of the patient, exact search',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  @Length(14, 14)
  nationalId?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'phone number of the patient, exact search',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  @IsPhoneNumber()
  phone?: string;

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
    enum: AllowedPatientSortingFields,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(AllowedPatientSortingFields))
  sortField?: string;

  @ApiProperty({
    enum: AllowedUserSortingValues,
    required: false,
  })
  @ValidateIf((obj) => Boolean(obj.sortField))
  @IsNotEmpty()
  @IsIn(Object.values(AllowedUserSortingValues))
  sortValue?: string;

  @ApiProperty({
    required: false,
    type: Number,
    default: 0,
    description: 'number of patients to skip before fetching',
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
    description: 'number of patients to return',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
