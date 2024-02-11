import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class TokenParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  id?: string;
}
