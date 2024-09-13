import { IsNotEmpty } from 'class-validator';

export class CreateUserMachineDto {
  @IsNotEmpty()
  userId!: string;  // Definite assignment assertion

  @IsNotEmpty()
  machineId!: string;  // Definite assignment assertion
}
