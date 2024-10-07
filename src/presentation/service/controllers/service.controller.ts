import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Inject } from "@nestjs/common";

import { IServiceUseCase, ServiceUseCase } from "src/use-cases/service";

@ApiTags("Service")
@Controller("services")
export class ServiceController {
    constructor(@Inject(ServiceUseCase) private readonly serviceUseCase: IServiceUseCase) {}

    @Get()
    public async getServices() {
        return this.serviceUseCase.getServices();
    }
}
