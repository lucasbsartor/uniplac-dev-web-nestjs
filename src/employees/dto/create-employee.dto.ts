import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  registration: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  group: number;
}
