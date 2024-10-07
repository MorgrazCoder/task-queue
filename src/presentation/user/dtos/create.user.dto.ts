import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: "Ivan2002" })
    @IsString()
    @IsNotEmpty()
    nick_name: string;
}
