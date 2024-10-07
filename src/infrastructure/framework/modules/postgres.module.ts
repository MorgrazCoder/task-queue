import { Global, Module } from "@nestjs/common";
import { PrismaModule, PrismaService } from "nestjs-prisma";

import {
    UserRepository,
    TicketRepository,
    ServiceRepository,
} from "@infrastructure/databases/postgres/prisma/repositories";

@Global()
@Module({
    imports: [PrismaModule.forRoot({ isGlobal: true })],
    providers: [
        {
            provide: UserRepository,
            useFactory: (ps: PrismaService) => {
                return new UserRepository(ps);
            },
            inject: [PrismaService],
        },
        {
            provide: TicketRepository,
            useFactory: (ps: PrismaService) => {
                return new TicketRepository(ps);
            },
            inject: [PrismaService],
        },
        {
            provide: ServiceRepository,
            useFactory: (ps: PrismaService) => {
                return new ServiceRepository(ps);
            },
            inject: [PrismaService],
        },
    ],
    exports: [UserRepository, TicketRepository, ServiceRepository],
})
export class PostgresModule {}
