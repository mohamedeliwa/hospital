import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class DecisionParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  id?: string;
}
