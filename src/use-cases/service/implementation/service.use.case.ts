import { TGetServiceRes } from "src/use-cases/service";

import { IServiceRepository } from "@infrastructure/databases/postgres/prisma/repositories";
import { ServiceNotFoundException } from "@infrastructure/exceptions";

export class ServiceUseCase {
    constructor(private readonly serviceRepository: IServiceRepository) {}

    public async getService(id: string): Promise<TGetServiceRes> {
        return this.serviceRepository.getById(id).then((data) => {
            if (!data) throw new ServiceNotFoundException();

            return data;
        });
    }

    public async getServices(): Promise<TGetServiceRes[]> {
        return this.serviceRepository.getAll();
    }
}
