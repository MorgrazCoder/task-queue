import { ConfigService } from "@nestjs/config";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { TaskEntity } from "./task.entity";

export class TaskQueue {
    private inProcess: boolean;
    private readonly queue: Array<TaskEntity>;

    private readonly retryCount: number;
    private readonly queueCheckInterval: number;

    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly configService: ConfigService
    ) {
        this.inProcess = false;
        this.queue = [];
        this.retryCount = this.configService.getOrThrow("RETRY_COUNT");
        this.queueCheckInterval = this.configService.getOrThrow("QUEUE_CHECK_INTERVAL") * 1000;

        setInterval(() => {
            if (!this.inProcess && this.queue.length) {
                const taskEntity = this.queue.shift();

                if (taskEntity && taskEntity.checkRetryCount()) {
                    this.inProcess = true;
                    this.nextTask(taskEntity);
                }
            }
        }, this.queueCheckInterval);
    }

    private async nextTask(task: TaskEntity) {
        console.info(`Processing an application with ticketId: ${task.ticketId}!`);

        return this.eventEmitter.emitAsync("queue.tasks", task.ticketId).then((result) => {
            if (result && result[0]) {
                console.info(result[0]);
            } else {
                task.reduceRetryCount();
                if (task.checkRetryCount()) {
                    console.info(
                        `Retry an application with ticketId: ${task.ticketId}; Attempts left: ${task.retryCount}!`
                    );
                    this.retryTask(task);
                }
            }
            this.inProcess = false;
        });
    }

    private retryTask(task: TaskEntity) {
        this.queue.unshift(task);
    }

    @OnEvent("queue.push")
    private push(task: any) {
        const taskEntity = new TaskEntity(task, this.retryCount);
        this.queue.push(taskEntity);
    }
}
