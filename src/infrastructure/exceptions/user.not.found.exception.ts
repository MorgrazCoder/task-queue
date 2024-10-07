import { HttpStatus } from "@nestjs/common";

import { BaseException } from "@infrastructure/exceptions";

export class UserNotFoundException extends BaseException {
    constructor() {
        super("Пользователь не найден в системе!", HttpStatus.NOT_FOUND);
    }
}
