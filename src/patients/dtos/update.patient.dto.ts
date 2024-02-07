import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePatientDto {
  @ApiProperty({
    type: String,
    required: false,
    minLength: 3,
    maxLength: 50,
    description: 'name of the patient',
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
    description: 'national ID of the patient',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  @Length(14, 14)
  nationalId?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'phone number of the patient',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  @IsPhoneNumber()
  phone?: string;
}
