export class TaskEntity {
    public readonly ticketId: string;
    public retryCount: number;
    constructor(ticketId: string, retryCount: number) {
        this.ticketId = ticketId;
        this.retryCount = retryCount;
    }

    public reduceRetryCount(): void {
        this.retryCount -= 1;
    }

    public checkRetryCount(): boolean {
        return this.retryCount >= 0;
    }
}
