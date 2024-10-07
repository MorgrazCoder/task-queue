import { HttpStatus } from "@nestjs/common";

import { BaseException } from "@infrastructure/exceptions";

export class UserAlreadyExistsException extends BaseException {
    constructor() {
        super("Пользователь с подобным именем уже зарегистрирован!", HttpStatus.CONFLICT);
    }
}
