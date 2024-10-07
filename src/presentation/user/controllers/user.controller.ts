import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";

import { IUserUseCase, UserUseCase } from "src/use-cases/user";

import { CreateUserDto } from "@presentation/user";

@ApiTags("User")
@Controller("users")
export class UserController {
    constructor(@Inject(UserUseCase) private readonly userUseCase: IUserUseCase) {}

    @Get()
    public async getUsers() {
        return this.userUseCase.getUsers();
    }

    @Post()
    public async createUser(@Body() dto: CreateUserDto) {
        return this.userUseCase.create(dto);
    }
}
