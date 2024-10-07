import { promisify } from "util";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { QueueEntryException } from "@infrastructure/exceptions";

import { IQueueUseCase } from "src/use-cases/queue";
import { ITicketUseCase } from "src/use-cases/ticket";

export class QueueUseCase implements IQueueUseCase {
    private readonly taskDelay: number;
    constructor(
        private readonly configService: ConfigService,
        private readonly ticketUseCase: ITicketUseCase,
        private readonly emitter: EventEmitter2
    ) {
        this.taskDelay = this.configService.getOrThrow("TASK_COMPLETE_DELAY") * 1000;
    }

    public async pushToQueue(ticketId: string): Promise<void> {
        const isCompleted = await this.ticketUseCase.isCompleted(ticketId);

        if (!isCompleted) {
            await this.emitter.emitAsync("queue.push", ticketId).catch(() => {
                throw new QueueEntryException();
            });
        }
    }

    @OnEvent("queue.tasks")
    public async executeTicket(ticketId: string): Promise<string> {
        await promisify(setTimeout)(this.taskDelay);

        return this.ticketUseCase
            .executeTicket(ticketId)
            .then(() => `Application with ticketId: ${ticketId} processed`);
    }
}
