import { HttpStatus } from "@nestjs/common";

import { BaseException } from "@infrastructure/exceptions";

export class ServiceNotFoundException extends BaseException {
    constructor() {
        super("Услуга не найдена в системе!", HttpStatus.NOT_FOUND);
    }
}
