import { HttpStatus } from "@nestjs/common";

import { BaseException } from "@infrastructure/exceptions";

export class TicketNotFoundException extends BaseException {
    constructor() {
        super("Талон на запись не найден в системе!", HttpStatus.NOT_FOUND);
    }
}
