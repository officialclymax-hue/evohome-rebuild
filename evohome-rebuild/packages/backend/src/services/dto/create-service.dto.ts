import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString() name!: string;
  @IsString() slug!: string;
  @IsString() category!: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() longDescription?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsString() averageSavings?: string;
  @IsOptional() @IsString() installTime?: string;
  @IsOptional() @IsString() warranty?: string;
  @IsOptional() @IsString() whatIsIt?: string;
}
