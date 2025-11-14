// src/modules/authors/author.dto.ts
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsUrl()
  picture?: string;
}

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsUrl()
  picture?: string;
}
