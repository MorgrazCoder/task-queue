import { TGetServiceRes } from "src/use-cases/service";

export interface IServiceUseCase {
    getService(id: string): Promise<TGetServiceRes>;

    getServices(): Promise<TGetServiceRes[]>;
}
