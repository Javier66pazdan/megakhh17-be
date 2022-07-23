import { IsEmail, Length } from "class-validator";

export class AuthLoginDto {
    @IsEmail({}, { message: "Niepoprawny adres email" })
    @Length(4, 255, { message: "Email musi mieć od 4 do 255 znaków." })
    email: string;

    @Length(4, 255, { message: "Hasło musi mieć minimum 8 znaków." })
    pwd: string;
}
