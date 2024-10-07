import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Inject, Post } from "@nestjs/common";

import { IQueueUseCase, QueueUseCase } from "src/use-cases/queue";

import { PushToQueueDto } from "@presentation/queue";

@ApiTags("Queue")
@Controller("queue")
export class QueueController {
    constructor(@Inject(QueueUseCase) private readonly queueUseCase: IQueueUseCase) {}

    @Post("push")
    async addToQueue(@Body() dto: PushToQueueDto): Promise<void> {
        return this.queueUseCase.pushToQueue(dto.ticket_id);
    }
}

