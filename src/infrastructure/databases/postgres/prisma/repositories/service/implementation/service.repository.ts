import { PrismaService } from "nestjs-prisma";

import { IServiceDomain, ServiceDomain } from "@domain";

import { IServiceRepository } from "@infrastructure/databases/postgres/prisma/repositories";

export class ServiceRepository implements IServiceRepository {
    private readonly serviceClient: PrismaService["service"];

    constructor(prismaService: PrismaService) {
        this.serviceClient = prismaService.service;
    }

    public async getAll(): Promise<IServiceDomain[]> {
        return this.serviceClient.findMany().then((services) =>
            services.map(
                ({ id, name, description }) =>
                    new ServiceDomain({
                        service_id: id,
                        service_name: name,
                        service_description: description,
                    })
            )
        );
    }

    public async getById(id: string): Promise<IServiceDomain | null> {
        return this.serviceClient.findUnique({ where: { id } }).then(
            (data) =>
                data &&
                new ServiceDomain({
                    service_id: data.id,
                    service_name: data.name,
                    service_description: data.description,
                })
        );
    }
}
