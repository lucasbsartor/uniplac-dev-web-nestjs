import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  buysOnCredit: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  creditPayDate: number;
}
