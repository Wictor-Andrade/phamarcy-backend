import {
  IsArray,
  IsEmail,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @MinLength(6)
  @IsString()
  name: string;

  @IsUUID()
  @IsString()
  filialId: string;

  @IsUUID()
  @IsString()
  funcionarioId: string;


  @IsUUID()
  @IsString()
  roleId: string;
}
