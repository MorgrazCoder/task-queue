import { Module } from "@nestjs/common";

import { IUserUseCase, UserUseCase } from "src/use-cases/user";

import { UserController } from "@presentation/user";

import {
    IUserRepository,
    UserRepository,
} from "@infrastructure/databases/postgres/prisma/repositories";

@Module({
    providers: [
        {
            provide: UserUseCase,
            useFactory: (repository: IUserRepository): IUserUseCase => new UserUseCase(repository),
            inject: [UserRepository],
        },
    ],
    controllers: [UserController],
    exports: [UserUseCase],
})
export class UserModule {}
