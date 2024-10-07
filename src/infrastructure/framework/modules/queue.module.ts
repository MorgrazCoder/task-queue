import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2, EventEmitterModule } from "@nestjs/event-emitter";

import { TaskQueue } from "@infrastructure/queue";
import { TicketModule } from "@infrastructure/framework/modules/ticket.module";

import { IQueueUseCase, QueueUseCase } from "src/use-cases/queue";
import { ITicketUseCase, TicketUseCase } from "src/use-cases/ticket";

import { QueueController } from "@presentation/queue";

@Module({
    imports: [TicketModule, EventEmitterModule.forRoot({ global: true, delimiter: "." })],
    providers: [
        {
            provide: QueueUseCase,
            useFactory: (
                cs: ConfigService,
                ticketUseCase: ITicketUseCase,
                emitter: EventEmitter2
            ): IQueueUseCase => new QueueUseCase(cs, ticketUseCase, emitter),
            inject: [ConfigService, TicketUseCase, EventEmitter2],
        },
        {
            provide: TaskQueue,
            useFactory: (emitter: EventEmitter2, cs: ConfigService) => new TaskQueue(emitter, cs),
            inject: [EventEmitter2, ConfigService],
        },
    ],
    controllers: [QueueController],
    // exports: [QueueUseCase]
})
export class QueueModule {}
