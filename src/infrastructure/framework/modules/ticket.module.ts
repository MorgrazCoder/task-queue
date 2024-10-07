import { Module } from "@nestjs/common";

import { UserModule } from "@infrastructure/framework/modules/user.module";
import { ServiceModule } from "@infrastructure/framework/modules/service.module";

import { IUserUseCase, UserUseCase } from "src/use-cases/user";
import { ITicketUseCase, TicketUseCase } from "src/use-cases/ticket";
import { IServiceUseCase, ServiceUseCase } from "src/use-cases/service";

import { TicketController } from "@presentation/ticket";

import {
    TicketRepository,
    ITicketRepository,
} from "@infrastructure/databases/postgres/prisma/repositories";

@Module({
    imports: [UserModule, ServiceModule],
    providers: [
        {
            provide: TicketUseCase,
            useFactory: (
                userUseCase: IUserUseCase,
                serviceUseCase: IServiceUseCase,
                repository: ITicketRepository
            ): ITicketUseCase => new TicketUseCase(userUseCase, serviceUseCase, repository),
            inject: [UserUseCase, ServiceUseCase, TicketRepository],
        },
    ],
    controllers: [TicketController],
    exports: [TicketUseCase],
})
export class TicketModule {}
