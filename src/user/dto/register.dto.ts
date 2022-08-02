import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail({ message: 'Niepoprawny adres e-mail' })
  @Length(4, 255, { message: 'Adres e-mail musi mieć od 4 do 255 znaków.' })
  email: string;

  @Length(8, 255, {
    message: 'Hasło powinno składać się z co najmniej 8 znaków.',
  })
  pwd: string;

  @Length(2, 7, {
    message: 'Nazwa roli powinna mieć między 2 a 7 znaków.',
  })
  roleName: string;
}
