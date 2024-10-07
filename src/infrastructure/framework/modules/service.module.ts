import { Module } from "@nestjs/common";

import { IServiceUseCase, ServiceUseCase } from "src/use-cases/service";

import { ServiceController } from "@presentation/service";

import {
    IServiceRepository,
    ServiceRepository,
} from "@infrastructure/databases/postgres/prisma/repositories";

@Module({
    providers: [
        {
            provide: ServiceUseCase,
            useFactory: (repository: IServiceRepository): IServiceUseCase =>
                new ServiceUseCase(repository),
            inject: [ServiceRepository],
        },
    ],
    controllers: [ServiceController],
    exports: [ServiceUseCase],
})
export class ServiceModule {}
