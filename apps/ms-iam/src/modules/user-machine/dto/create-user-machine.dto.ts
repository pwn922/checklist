import { IsNotEmpty } from 'class-validator';

export class CreateUserMachineDto {
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  machineId!: string;
}