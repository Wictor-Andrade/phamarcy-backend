import {
  IsEmail,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '@Admin1234',
    minLength: 6,
    maxLength: 20,
    description:
      'Deve conter letras maiúsculas, minúsculas e número ou caractere especial',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({ example: 'Ana Banana', minLength: 6 })
  @MinLength(6)
  @IsString()
  name: string;

  @ApiProperty({ example: 'c0a8012a-7e6d-11ec-90d6-0242ac120003' })
  @IsUUID()
  @IsString()
  filialId: string;

  @ApiProperty({ example: 'd5c13f7b-9a2e-4f6a-9b23-12f2cd91d6fd' })
  @IsUUID()
  @IsString()
  funcionarioId: string;

  @ApiProperty({ example: 'f1a1b2c3-d4e5-6789-abcd-ef0123456789' })
  @IsUUID()
  @IsString()
  roleId: string;
}
