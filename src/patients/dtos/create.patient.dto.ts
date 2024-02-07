import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    description: 'name of the patient',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'national ID of the patient',
  })
  @IsNotEmpty()
  @IsNumberString()
  @Length(14, 14)
  nationalId: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'phone number of the patient',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;
}
