import { HttpStatus } from "@nestjs/common";

import { BaseException } from "@infrastructure/exceptions";

export class QueueEntryException extends BaseException {
    constructor() {
        super("Ошибка при попытке записи в очередь!", HttpStatus.CONFLICT);
    }
}
