import { IsNumberString, IsOptional } from "class-validator";

export class LocationDto {
  @IsNumberString()
  @IsOptional()
  latitude?: string;

  @IsNumberString()
  @IsOptional()
  longitude?: string;
}