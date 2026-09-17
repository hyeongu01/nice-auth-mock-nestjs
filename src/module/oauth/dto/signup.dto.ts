import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'client 이름 (1 ~ 100자)',
  })
  @Length(1, 100)
  @IsNotEmpty()
  @IsString()
  name: string;
}
