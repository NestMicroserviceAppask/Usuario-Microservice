import { IS_STRONG_PASSWORD, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator"

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    public name:string
    
    @IsString()
    @IsNotEmpty()
    public usuario:string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
   public  email:string

    @IsString()
    @IsNotEmpty()
   
    public password:string
}
