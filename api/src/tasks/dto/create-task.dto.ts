import { IsNotEmpty } from 'class-validator';

/**
 * DTO
 * data tranfer object
 */
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
