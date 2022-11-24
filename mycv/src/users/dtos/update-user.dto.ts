import { IsString, IsEmail, IsOptional } from 'class-validator'

export class UpdateuserDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}