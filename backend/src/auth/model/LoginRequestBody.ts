import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginRequestBody {
  @IsString()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password is incorrect',
  })
  password: string;
}
