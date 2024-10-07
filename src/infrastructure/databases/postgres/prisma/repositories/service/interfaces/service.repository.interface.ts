import { IServiceDomain } from "@domain";

export interface IServiceRepository {
    getAll(): Promise<IServiceDomain[]>;

    getById(id: string): Promise<IServiceDomain | null>;
}
