import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsBoolean()
  buysOnCredit = false;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(30)
  creditPayDate = 5;
}
